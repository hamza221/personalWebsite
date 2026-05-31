<template>
  <div class="container">
    <Modal v-if="contact" title="Contact" :minimized="contactsMinimized">
      <template #content>
        <Contact />
      </template>
    </Modal>
    <Modal v-if="internet" title="Browser" :minimized="browserMinimized">
      <template #content>
        <Website />
      </template>
    </Modal>
    <Modal v-if="photography" title="Photography" :minimized="photographyMinimized"> </Modal>
    <Modal v-if="resume" title="Resume" :minimized="resumeMinimized">
      <template #content>
        <Resume />
      </template>
    </Modal>
  </div>
</template>
<script setup>
import Modal from './Modal.vue'
import Contact from '../pages/Contact.vue'
import Website from '../pages/Website.vue'
import Resume from '../pages/Resume.vue'
import eventBus from '@/eventBus'
import { computed, onUnmounted } from 'vue'
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

const onMinimize = (payload) => modalsStore.minimizeModal(payload.name, true)
const onOpen = (payload) => {
  modalsStore.minimizeAllExcept(payload.name)
  modalsStore.openModal(payload.name)
}
const onClose = (payload) => modalsStore.closeModal(payload.name)
const onUnMinimize = (payload) => modalsStore.minimizeModal(payload.name, false)

eventBus.on('minimizeApp', onMinimize)
eventBus.on('openApp', onOpen)
eventBus.on('closeApp', onClose)
eventBus.on('unMinimizeApp', onUnMinimize)

onUnmounted(() => {
  eventBus.off('minimizeApp', onMinimize)
  eventBus.off('openApp', onOpen)
  eventBus.off('closeApp', onClose)
  eventBus.off('unMinimizeApp', onUnMinimize)
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
