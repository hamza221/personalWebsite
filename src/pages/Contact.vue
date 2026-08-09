<template>
  <form class="content" @submit.prevent="openEmailApp">
    <p class="eyebrow">NEW MESSAGE</p>
    <h2>Let’s talk.</h2>
    <p class="intro">Fill this out and I’ll open your email app with the message ready to send.</p>
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="name" id="name" name="name" required />
    </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input type="text" v-model="subject" id="subject" name="subject" required />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" name="email" required />
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" v-model="message" name="message" required></textarea>
    </div>
    <button type="submit">Continue in email app</button>
    <p class="direct-contact">
      Prefer a direct link?
      <a href="mailto:contact@hamzamahjoubi.com">contact@hamzamahjoubi.com</a>
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
<style lang="scss" scoped>
.content {
  min-height: 100%;
  background-color: #f7f3e8;
  padding: clamp(1rem, 4vw, 2rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  * {
    font-family: Arial, sans-serif;
  }
}
.eyebrow {
  color: var(--blue);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
h2 {
  margin: 0.35rem 0;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}
.intro {
  margin-bottom: 1rem;
  line-height: 1.5;
}
.form-group {
  display: grid;
  gap: 0.25rem;
}
input,
textarea {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
}
textarea {
  min-height: 7rem;
  resize: vertical;
}
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid #ffdf00;
  border-color: var(--blue);
}
button {
  background-color: var(--blue);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.direct-contact {
  margin-top: 1rem;
  font-size: 0.85rem;
}
.direct-contact a {
  color: var(--blue);
  user-select: text;
}
</style>
