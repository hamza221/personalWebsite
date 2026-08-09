<template>
  <button class="button" type="button" role="menuitem" @click="handleClick">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  name: String,
  href: String,
})
import eventBus from '@/eventBus'
import { playAppClick } from '@/utils/uiSounds'
const emit = defineEmits(['click'])
const handleClick = () => {
  playAppClick()
  if (props.href) {
    window.open(props.href, '_blank', 'noopener,noreferrer')
  } else {
    eventBus.emit('openApp', { name: props.name.toLowerCase() })
  }
  emit('click')
}
</script>
<style lang="scss" scoped>
.button {
  width: 100%;
  background-color: var(--tertiary-color);
  border: none;
  display: flex;
  cursor: pointer;
  padding: 0.25rem;
  align-items: center;
}
.icon {
  height: 16px;
  aspect-ratio: 1/1;
  margin-right: 4px;
  align-items: center;
  display: flex;
}
.button:hover,
.button:focus-visible {
  background-color: var(--blue);
  color: white;
  outline: 1px dotted white;
  outline-offset: -3px;
}
</style>
