<template>
  <div class="toolbar">
    <StartButton :expanded="startMenuOpen" @toggle="$emit('toggle-start-menu')" />
    <Spacer />
    <div class="white-space">
      <Minimized v-for="app in minimizedApps" :key="app.name" :name="app.name" :label="app.label" />
    </div>
    <Spacer />
    <QuickLinks />
    <Clock />
  </div>
</template>
<script setup>
import StartButton from './StartButton.vue'
import Spacer from './Spacer.vue'
import Clock from './Clock.vue'
import Minimized from './Minimized.vue'
import QuickLinks from './QuickLinks.vue'
import { computed } from 'vue'
import { useModalsStore } from '@/stores/modals'

defineProps({
  startMenuOpen: {
    type: Boolean,
    default: false,
  },
})

const modalsStore = useModalsStore()
const minimizedApps = computed(() => {
  return modalsStore.getAllMinimized
})
</script>
<style scoped>
.toolbar {
  width: 100vw;
  height: 2.5rem;
  display: flex;
  align-items: center;
  background-color: var(--tertiary-color);
  border-top-width: 2px;
  border-color: var(--border-white-color);
  padding: 0.25rem;
  position: absolute;
  bottom: 0;
}
.white-space {
  display: flex;
  flex: 1 1 0%;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
}
</style>
