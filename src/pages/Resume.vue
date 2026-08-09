<template>
  <div class="wrapper">
    <iframe
      class="website-view"
      title="Hamza Mahjoubi résumé"
      sandbox="allow-popups allow-popups-to-escape-sandbox"
      :srcdoc="resumeHtml"
    ></iframe>
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
.website-view {
  height: 100%;
  width: 100%;
  border: 1px solid #777;
  background: white;
}
</style>
