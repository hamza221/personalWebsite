<template>
  <div class="content">
    <Application :x="10" :y="10">
      <template #icon>
        <img src="../assets/contact.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Contact</p>
      </template>
    </Application>
    <Application :x="110" :y="10">
      <template #icon>
        <img src="../assets/internet.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Browser</p>
      </template>
    </Application>
    <Application :x="210" :y="10">
      <template #icon>
        <img src="../assets/photgraphy.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Photography</p>
      </template>
    </Application>
    <Application :x="310" :y="10">
      <template #icon>
        <img src="../assets/resume.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Resume</p>
      </template>
    </Application>
  </div>
</template>
<script setup>
import Application from './Application.vue'
</script>
<style lang="scss" scoped>
.content {
  width: 100vw;
  height: calc(100vh - 2.5rem);
  position: absolute;
  top: 0;
}
.app-name {
  color: white;
  font-family: px_sans_nouveaux;
}
</style>
