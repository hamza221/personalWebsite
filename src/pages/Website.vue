<template>
  <div class="wrapper">
    <nav class="navbar">
      <input v-model="url" type="text" />
    </nav>
    <div class="content"></div>
    <iframe class="website-view" :src="url"> </iframe>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const url = ref('https://blog.hamzamahjoubi.com/')
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.navbar {
  height: 10%;
  max-height: 100px;
  border: 2px solid var(--button-border-color);
  padding: 5px;
  display: flex;
  input {
    height: 100%;
    width: 100%;
  }
}
.website-view {
  height: 100%;
  width: 100%;
}
</style>
