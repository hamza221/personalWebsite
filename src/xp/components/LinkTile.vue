<template>
  <a class="link-tile" :href="href" target="_blank" rel="noopener noreferrer" @click="playAppClick">
    <img :src="icon" alt="" />
    <span>{{ label }}</span>
  </a>
</template>

<script setup>
import { playAppClick } from '@/utils/uiSounds'

defineProps({
  href: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<style scoped>
.link-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 6px 2px;
  border: 1px solid transparent;
  color: #000;
  text-align: center;
  text-decoration: none;
}

.link-tile img {
  width: var(--tile-icon, 32px);
  height: var(--tile-icon, 32px);
  object-fit: contain;
}

.link-tile:hover,
.link-tile:focus-visible {
  border-color: #a8c9ff;
  background: #316ac533;
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.link-tile:focus-visible span {
  color: white;
  background: var(--xp-selection, #316ac5);
}
</style>
