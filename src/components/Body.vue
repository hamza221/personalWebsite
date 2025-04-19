<template>
  <div class="content">
    <Application :x="10" :y="10" name="contact">
      <template #icon>
        <img src="../assets/contact.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Contact</p>
      </template>
    </Application>
    <Application :x="110" :y="10" name="browser">
      <template #icon>
        <img src="../assets/internet.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Browser</p>
      </template>
    </Application>
    <Application :x="210" :y="10" name="photography">
      <template #icon>
        <img src="../assets/photgraphy.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Photography</p>
      </template>
    </Application>
    <Application :x="310" :y="10" name="resume">
      <template #icon>
        <img src="../assets/resume.png" alt="Windows 11 Logo" />
      </template>
      <template #title>
        <p class="app-name">Resume</p>
      </template>
    </Application>
    <AllModals></AllModals>
  </div>
</template>
<script setup>
import Application from './Application.vue'
import AllModals from './AllModals.vue'
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
