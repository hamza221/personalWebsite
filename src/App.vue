<script setup>
import { defineAsyncComponent } from 'vue'
import { theme } from './theme'

// Each desktop loads only when selected, so classic visitors never download wxp.
const desktops = {
  classic: defineAsyncComponent(() => import('./classic/ClassicDesktop.vue')),
  xp: defineAsyncComponent(() => import('./xp/XpDesktop.vue')),
}
</script>

<template>
  <component :is="desktops[theme]" />
</template>
