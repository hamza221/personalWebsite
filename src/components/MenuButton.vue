<template>
  <button class="button" @click="handleClick">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  name: String,
})
import eventBus from '@/eventBus'
const emit = defineEmits(['click'])
const handleClick = () => {
  eventBus.emit('openApp', { name: props.name.toLowerCase() })
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
.button:hover {
  background-color: var(--blue);
  color: white;
}
</style>
