<template>
  <div class="container">
    <Modal v-if="contact" title="Contact" :minimized="contactsMinimized"> </Modal>
    <Modal v-if="internet" title="Browser" :minimized="browserMinimized"> </Modal>
    <Modal v-if="photography" title="Photography" :minimized="photographyMinimized"> </Modal>
    <Modal v-if="resume" title="Resume" :minimized="resumeMinimized"> </Modal>
  </div>
</template>
<script setup>
import Modal from './Modal.vue'
import eventBus from '@/eventBus'
import { computed } from 'vue'
import { useModalsStore } from '@/stores/modals'

const modalsStore = useModalsStore()

const contact = computed(() => modalsStore.getIsOpen('contact'))
const internet = computed(() => modalsStore.getIsOpen('browser'))
const photography = computed(() => modalsStore.getIsOpen('photography'))
const resume = computed(() => modalsStore.getIsOpen('resume'))
const contactsMinimized = computed(() => modalsStore.getisMinimized('contact'))
const browserMinimized = computed(() => modalsStore.getisMinimized('browser'))
const photographyMinimized = computed(() => modalsStore.getisMinimized('photography'))
const resumeMinimized = computed(() => modalsStore.getisMinimized('resume'))
eventBus.on('minimizeApp', (payload) => {
  const app = payload.name
  modalsStore.minimizeModal(app, true)
})
eventBus.on('openApp', (payload) => {
  console.log('openApp', payload)
  const app = payload.name
  modalsStore.minimizeAllExcept(app)
  modalsStore.openModal(app)
})
eventBus.on('closeApp', (payload) => {
  const app = payload.name
  modalsStore.closeModal(app)
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
