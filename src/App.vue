<script setup>
import ToolBar from './components/ToolBar.vue'
</script>

<template>
  <header>
  </header>

  <main class="main">
  <ToolBar />
  </main>
</template>

<style scoped>
 .main {
    height: 100vh;
    width: 100vw;
    background-color: var(--background-main);
    overflow: hidden;
    display: flex;
    position: relative;
 }
</style>
