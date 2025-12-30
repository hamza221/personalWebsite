<template>
  <div class="wrapper">
    <iframe class="website-view" :srcdoc="resumeHtml"> </iframe>
  </div>
</template>
<script setup>
import resumeHtml from './resume.html?raw'
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
