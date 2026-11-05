<template>
  <form class="content" @submit.prevent="openEmailApp">
    <p class="eyebrow">NEW MESSAGE</p>
    <h2>Let’s talk.</h2>
    <p class="intro">Fill this out and I’ll open your email app with the message ready to send.</p>
    <div class="xp-field">
      <label for="name">Name:</label>
      <input id="name" v-model="name" class="xp-input" type="text" name="name" required />
    </div>
    <div class="xp-field">
      <label for="subject">Subject:</label>
      <input id="subject" v-model="subject" class="xp-input" type="text" name="subject" required />
    </div>
    <div class="xp-field">
      <label for="email">Email:</label>
      <input id="email" v-model="email" class="xp-input" type="email" name="email" required />
    </div>
    <div class="xp-field">
      <label for="message">Message:</label>
      <textarea id="message" v-model="message" class="xp-input" name="message" required></textarea>
    </div>
    <div class="actions">
      <button class="xp-button xp-default" type="submit">Continue in email app</button>
    </div>
    <p class="direct-contact">
      Prefer a direct link?
      <a class="xp-link" href="mailto:contact@hamzamahjoubi.com">contact@hamzamahjoubi.com</a>
    </p>
  </form>
</template>
<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const subject = ref('')
const email = ref('')
const message = ref('')

const mailtoHref = computed(() => {
  const to = 'contact@hamzamahjoubi.com'
  const subj = encodeURIComponent(subject.value || '')
  const body = encodeURIComponent(
    `${message.value || ''}\n\n-- ${name.value || ''} (${email.value || ''})`
  )
  return `mailto:${to}?subject=${subj}&body=${body}`
})
const openEmailApp = () => {
  window.location.href = mailtoHref.value
}
</script>
<style scoped>
.content {
  min-height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.eyebrow {
  color: var(--blue);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.1em;
}
h2 {
  color: #1e3a8a;
  font:
    bold 22px 'Trebuchet MS',
    Tahoma,
    sans-serif;
}
.intro {
  margin-bottom: 4px;
  line-height: 1.5;
}
.xp-field {
  align-items: stretch;
}
textarea.xp-input {
  min-height: 7rem;
  resize: vertical;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}
.direct-contact {
  user-select: text;
}
</style>
