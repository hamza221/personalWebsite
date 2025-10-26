<template>
  <form v-if="!submitted" class="content" @submit="handleSubmit">
    <a id="send-email" :href="mailtoHref"></a>
    <h3>Contact</h3>
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
    <button type="submit">Submit</button>
  </form>
  <div v-else class="content">
    <h3>Thank you for your message!</h3>
    <p>We will get back to you soon.</p>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const subject = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

const mailtoHref = computed(() => {
  const to = 'hamzamahjoubi221@gmail.com'
  const subj = encodeURIComponent(subject.value || '')
  const body = encodeURIComponent(
    `${message.value || ''}\n\n-- ${name.value || ''} (${email.value || ''})`
  )
  return `mailto:${to}?subject=${subj}&body=${body}`
})
const handleSubmit = (event) => {
  event.preventDefault()
  const sendEmailLink = document.getElementById('send-email')
  sendEmailLink.click()
  submitted.value = true
}
</script>
<style lang="scss" scoped>
.content {
  background-color: white;
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  * {
    font-family: Arial, sans-serif;
  }
}
input,
textarea {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
}
button {
  background-color: var(--blue);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
#send-email {
  display: none;
}
</style>
