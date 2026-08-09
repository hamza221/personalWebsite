<template>
  <div class="container">
    <Modal
      v-if="welcome.isOpen"
      name="welcome"
      title="Welcome"
      :x="300"
      :y="160"
      :minimized="welcome.isMinimized"
      :z-index="welcome.zIndex"
      @activate="activate('welcome')"
    >
      <template #content>
        <Welcome />
      </template>
    </Modal>
    <Modal
      v-if="contact.isOpen"
      name="contact"
      title="Contact"
      :x="180"
      :y="90"
      :minimized="contact.isMinimized"
      :z-index="contact.zIndex"
      @activate="activate('contact')"
    >
      <template #content>
        <Contact />
      </template>
    </Modal>
    <Modal
      v-if="blog.isOpen"
      name="blog"
      title="Blog"
      :x="70"
      :y="70"
      :minimized="blog.isMinimized"
      :z-index="blog.zIndex"
      @activate="activate('blog')"
    >
      <template #content>
        <ComingSoon kind="blog" title="The blog" icon="✍️" />
      </template>
    </Modal>
    <Modal
      v-if="photography.isOpen"
      name="photography"
      title="Photography"
      :x="120"
      :y="120"
      :minimized="photography.isMinimized"
      :z-index="photography.zIndex"
      @activate="activate('photography')"
    >
      <template #content>
        <ComingSoon kind="photography" title="Photography" icon="📷" />
      </template>
    </Modal>
    <Modal
      v-if="resume.isOpen"
      name="resume"
      title="Résumé"
      :x="230"
      :y="60"
      :minimized="resume.isMinimized"
      :z-index="resume.zIndex"
      @activate="activate('resume')"
    >
      <template #content>
        <Resume />
      </template>
    </Modal>
    <Modal
      v-if="experiments.isOpen"
      name="experiments"
      title="Experiments"
      :x="260"
      :y="120"
      :minimized="experiments.isMinimized"
      :z-index="experiments.zIndex"
      @activate="activate('experiments')"
    >
      <template #content>
        <Experiments />
      </template>
    </Modal>
    <Modal
      v-if="projects.isOpen"
      name="projects"
      title="Projects"
      :x="300"
      :y="100"
      :minimized="projects.isMinimized"
      :z-index="projects.zIndex"
      @activate="activate('projects')"
    >
      <template #content>
        <Projects />
      </template>
    </Modal>
    <Modal
      v-if="miscLinks.isOpen"
      name="misc-links"
      title="MISC_LINKS.TXT — Read Only"
      :x="340"
      :y="130"
      :minimized="miscLinks.isMinimized"
      :z-index="miscLinks.zIndex"
      @activate="activate('misc-links')"
    >
      <template #content>
        <MiscLinks />
      </template>
    </Modal>
  </div>
</template>
<script setup>
import Modal from './Modal.vue'
import Welcome from '../pages/Welcome.vue'
import Contact from '../pages/Contact.vue'
import ComingSoon from '../pages/ComingSoon.vue'
import Resume from '../pages/Resume.vue'
import Experiments from '../pages/Experiments.vue'
import Projects from '../pages/Projects.vue'
import MiscLinks from '../pages/MiscLinks.vue'
import eventBus from '@/eventBus'
import { computed, onUnmounted } from 'vue'
import { useModalsStore } from '@/stores/modals'

const modalsStore = useModalsStore()

const welcome = computed(() => modalsStore.getModal('welcome'))
const contact = computed(() => modalsStore.getModal('contact'))
const blog = computed(() => modalsStore.getModal('blog'))
const photography = computed(() => modalsStore.getModal('photography'))
const resume = computed(() => modalsStore.getModal('resume'))
const experiments = computed(() => modalsStore.getModal('experiments'))
const projects = computed(() => modalsStore.getModal('projects'))
const miscLinks = computed(() => modalsStore.getModal('misc-links'))

const onMinimize = (payload) => modalsStore.minimizeModal(payload.name, true)
const onOpen = (payload) => {
  modalsStore.openModal(payload.name)
}
const onClose = (payload) => modalsStore.closeModal(payload.name)
const onUnMinimize = (payload) => modalsStore.minimizeModal(payload.name, false)
const activate = (name) => modalsStore.bringToFront(name)

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
