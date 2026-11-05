<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { fetchGuestbookPage, guestbookRepositoryUrl } from '@/utils/guestbook'
import bookIcon from '@/assets/guestbook.ico'

const entries = ref([])
const loading = ref(false)
const error = ref('')
const hasMore = ref(true)
const failedAvatars = ref(new Set())
const controller = new window.AbortController()
let nextPage = 1

const commands = `git switch -c guestbook-hello
git commit --allow-empty -m "Love your website!" && git push -u origin HEAD`

async function loadMore() {
  if (loading.value) return
  loading.value = true
  error.value = ''
  try {
    const page = await fetchGuestbookPage(nextPage, controller.signal)
    const known = new Set(entries.value.map((entry) => entry.number))
    entries.value.push(...page.entries.filter((entry) => !known.has(entry.number)))
    hasMore.value = page.hasMore
    nextPage++
  } catch (cause) {
    if (cause.name !== 'AbortError') {
      error.value = cause.message || 'Could not reach GitHub. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(loadMore)
onUnmounted(() => controller.abort())
</script>

<template>
  <section class="guest-book">
    <header class="book-heading">
      <img :src="bookIcon" alt="" width="32" height="32" />
      <div>
        <p class="eyebrow">GOOD PEOPLE. LITTLE NOTES.</p>
        <h2>Guest book</h2>
      </div>
    </header>
    <p class="intro">Leave a hello in the history. Sign with a Git commit.</p>
    <details class="guide" open>
      <summary>How to sign the book</summary>
      <ol class="steps">
        <li>
          <a :href="`${guestbookRepositoryUrl}/fork`" target="_blank" rel="noopener noreferrer"
            >Fork the repository</a
          >
          on GitHub and clone your fork. You need Git and GitHub push authentication. Start from an
          up-to-date <code>main</code> with no staged changes.
        </li>
        <li>
          In your clone, create a new branch and an empty commit. Replace the example message; use a
          different branch name if you have signed before.
          <pre aria-label="Git commands to sign the guest book"><code>{{ commands }}</code></pre>
        </li>
        <li>
          <a :href="`${guestbookRepositoryUrl}/compare`" target="_blank" rel="noopener noreferrer"
            >Open a pull request</a
          >
          from your branch to <code>hamza221/personalWebsite:main</code>. Choose “compare across
          forks” on GitHub. Pushing alone does not open a PR.
        </li>
      </ol>
      <p class="guide-note">
        PRs with no file changes are eligible for automatic merging, subject to repository checks.
        Your commit messages appear here after merge. PRs with file changes are not guest-book
        entries.
      </p>
    </details>
    <p class="privacy">
      Public by design: your GitHub profile and message are visible to everyone. Do not include
      private information; Git history keeps a record.
    </p>
    <section aria-labelledby="guest-entries-heading" class="entries" :aria-busy="loading">
      <div class="entries-heading">
        <h3 id="guest-entries-heading">Passing notes</h3>
        <a
          :href="`${guestbookRepositoryUrl}/pulls?q=is%3Apr+is%3Amerged`"
          target="_blank"
          rel="noopener noreferrer"
          >View on GitHub</a
        >
      </div>
      <p class="source-note">Merged, no-file-change PRs · newest submissions first</p>
      <p v-if="loading" class="status" role="status">Reading the guest book from GitHub…</p>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <p v-if="!loading && !error && !entries.length" class="empty">
        {{
          hasMore
            ? 'No guest-book notes in the PRs checked so far. Check older PRs below.'
            : 'No signatures yet. Leave the first hello!'
        }}
      </p>
      <ol class="notes">
        <li v-for="entry in entries" :key="entry.number">
          <article>
            <header class="entry-heading">
              <div class="author">
                <img
                  v-if="entry.avatarUrl && !failedAvatars.has(entry.number)"
                  :src="entry.avatarUrl"
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                  @error="failedAvatars.add(entry.number)"
                />
                <span v-else class="avatar-fallback" aria-hidden="true">{{
                  entry.username.charAt(0).toUpperCase()
                }}</span>
                <a
                  v-if="entry.profileUrl"
                  :href="entry.profileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  >@{{ entry.username }}</a
                >
                <span v-else>{{ entry.username }}</span>
              </div>
              <a
                :href="entry.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Read guest book PR ${entry.number}`"
              >
                <time :datetime="entry.createdAt">{{ formatDate(entry.createdAt) }}</time> · #{{
                  entry.number
                }}
              </a>
            </header>
            <p v-for="message in entry.messages" :key="message.sha" class="message">
              {{ message.text }}
            </p>
          </article>
        </li>
      </ol>
      <button v-if="error || hasMore" type="button" :disabled="loading" @click="loadMore">
        {{ error ? 'Try again' : 'Check older PRs' }}
      </button>
      <p class="source-note">
        Loaded directly from GitHub. Its public API limits requests; no sign-in token is stored
        here.
      </p>
    </section>
  </section>
</template>

<style scoped>
.guest-book {
  min-height: 100%;
  padding: clamp(1rem, 4vw, 2rem);
  background: #f7f3e8;
  color: #222;
}
.guest-book * {
  font-family: Arial, sans-serif;
}
.book-heading,
.author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.book-heading img,
.author img {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.book-heading img {
  image-rendering: pixelated;
}
.eyebrow {
  color: var(--blue);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
h2 {
  margin: 0.25rem 0;
  font-size: 2rem;
}
a {
  color: var(--blue);
  overflow-wrap: anywhere;
}
.intro {
  margin: 0.75rem 0 1rem;
  line-height: 1.5;
}
.guide {
  border: 1px solid #b6ad98;
  background: #fffdf5;
}
summary {
  padding: 0.8rem;
  cursor: pointer;
  font-weight: 700;
  color: var(--blue);
}
summary:focus-visible {
  outline: 3px solid #ffdf00;
}
.steps {
  padding: 0 1rem 0 2.25rem;
}
.steps li {
  padding: 0.4rem 0;
  line-height: 1.55;
  font-size: 0.85rem;
}
.guest-book code {
  font-family: monospace;
  user-select: text;
}
pre {
  margin-top: 0.6rem;
  padding: 0.75rem;
  background: #eae7dc;
  border: 1px inset #bbb;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.guide-note,
.privacy,
.source-note {
  font-size: 0.75rem;
  line-height: 1.5;
  color: #595344;
}
.guide-note {
  padding: 0.75rem 1rem;
}
.privacy {
  margin-top: 0.75rem;
}
.entries {
  margin-top: 1.5rem;
  border-top: 2px solid #c9c1ad;
  padding-top: 1rem;
}
.entries-heading,
.entry-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.entries-heading a,
.entry-heading > a {
  font-size: 0.75rem;
}
h3 {
  font-size: 1rem;
}
.source-note {
  margin: 0.5rem 0;
}
.status,
.empty,
.error {
  padding: 1rem 0;
  line-height: 1.5;
  font-size: 0.85rem;
}
.error {
  color: #a02020;
}
.notes {
  list-style: none;
}
.notes li {
  padding: 1rem 0;
  border-bottom: 1px solid #d8d0bd;
}
.author {
  font-size: 0.85rem;
  font-weight: 700;
}
.avatar-fallback {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: #e1dccd;
}
.message {
  margin-top: 0.6rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  line-height: 1.6;
  user-select: text;
}
button {
  margin-top: 1rem;
  padding: 0.65rem 1rem;
  background: var(--blue);
  color: white;
  cursor: pointer;
  border: 2px outset #aaa;
}
button:disabled {
  opacity: 0.6;
  cursor: wait;
}
</style>
