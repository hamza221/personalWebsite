<template>
  <div class="clock">
    <span class="clock__text">
      {{ currentTime }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
  return 60000 - now.getSeconds() * 1000 + now.getMilliseconds()
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
onMounted(() => {
  const timeout = updateTime()
  sleep(timeout).then(() => {
    updateTime()
    setInterval(updateTime, 60000)
  })
})
</script>
<style lang="scss" scoped>
.clock {
  padding: 0 0.5rem;
  gap: 0.25rem;
  border: 2px solid var(--button-border-color);
  background-color: var(--tertiary-color);
  height: 2rem;
  font-size: 100%;
  display: flex;
  cursor: default;
  align-items: center;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    inset -1px -1px 0px #000000,
    inset 1px 1px 0px #ffffff;
  &__text {
    font-family: sans-serif;
  }
}
</style>
