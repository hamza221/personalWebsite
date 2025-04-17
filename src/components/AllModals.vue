<template>
  <div class="container">
    <Modal v-if="contact" title="Contact"> </Modal>
    <Modal v-if="internet" title="Internet"> </Modal>
    <Modal v-if="photo" title="Photography"> </Modal>
    <Modal v-if="resume" title="Resume"> </Modal>
  </div>
</template>
<script setup>
import Modal from './Modal.vue'
import eventBus from '@/eventBus'
import { ref } from 'vue'
const contact = ref(false)
const internet = ref(false)
const photo = ref(false)
const resume = ref(false)
eventBus.on('openApp', (payload) => {
  const app = payload.name
  console.log(app)
  contact.value = false
  internet.value = false
  photo.value = false
  resume.value = false
  eventBus.emit('minimizeAll')
  switch (app) {
    case 'contact':
      contact.value = true
      break
    case 'browser':
      internet.value = true
      break
    case 'photo':
      photo.value = true
      break
    case 'resume':
      resume.value = true
      break
    default:
      console.error(`Application ${app} doesn't exist`)
      break
  }
  console.log(contact)
})
eventBus.on('closeApp', (payload) => {
  const app = payload.name
  switch (app) {
    case 'contact':
      contact.value = false
      break
    case 'browser':
      internet.value = false
      break
    case 'photo':
      photo.value = false
      break
    case 'resume':
      resume.value = false
      break
    default:
      console.error(`Application ${app} doesn't exist`)
      break
  }
})
</script>
<style lang="scss" scoped>
.container {
  pointer-events: none;
  width: 100vw;
  height: calc(100vh - 2.5rem);
  position: absolute;
  top: 0;
}
</style>
