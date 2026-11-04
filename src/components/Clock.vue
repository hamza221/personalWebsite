<template>
  <time class="clock">{{ currentTime }}</time>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let timeoutId = null
let intervalId = null

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
  return 60000 - now.getSeconds() * 1000 - now.getMilliseconds()
}

onMounted(() => {
  const delay = updateTime()
  timeoutId = setTimeout(() => {
    updateTime()
    intervalId = setInterval(updateTime, 60000)
  }, delay)
})

onUnmounted(() => {
  clearTimeout(timeoutId)
  clearInterval(intervalId)
})
</script>

<style scoped>
.clock {
  color: white;
  font:
    11px Tahoma,
    Arial,
    sans-serif;
  cursor: default;
}
</style>
