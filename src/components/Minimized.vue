<template>
  <button class="minimized-button" @click="handleOpen">
    {{ props.name }}
  </button>
</template>
<script setup>
import eventBus from '@/eventBus'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const handleOpen = () => {
  eventBus.emit('unMinimizeApp', { name: props.name.toLowerCase() })
}
</script>
<style scoped lang="scss">
.minimized-button {
  padding: 0 10px 0 6px;
  height: 1.5rem;
  background-color: #ddd;
  text-align: left;
  margin-right: 10px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  font-family: Arial;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  width: 140px;
  box-shadow: inset 1px 1px grey;
}
</style>
