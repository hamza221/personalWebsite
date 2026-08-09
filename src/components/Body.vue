<template>
  <div class="content">
    <nav class="applications" aria-label="Desktop applications">
      <Application :x="12" :y="12" name="welcome" persist-position-key="portfolio:icon:v1:welcome">
        <template #icon>
          <img src="../assets/welcome.ico" alt="" />
        </template>
        <template #title>
          <p class="app-name">Welcome</p>
        </template>
      </Application>
      <Application :x="112" :y="12" name="contact" persist-position-key="portfolio:icon:v1:contact">
        <template #icon>
          <img src="../assets/contact.png" alt="" />
        </template>
        <template #title>
          <p class="app-name">Contact</p>
        </template>
      </Application>
      <Application :x="212" :y="12" name="blog" persist-position-key="portfolio:icon:v1:blog">
        <template #icon>
          <img src="../assets/internet.png" alt="" />
        </template>
        <template #title>
          <p class="app-name">Blog</p>
        </template>
      </Application>
      <Application
        :x="312"
        :y="12"
        name="photography"
        persist-position-key="portfolio:icon:v1:photography"
      >
        <template #icon>
          <img src="../assets/photgraphy.png" alt="" />
        </template>
        <template #title>
          <p class="app-name">Photography</p>
        </template>
      </Application>
      <Application :x="12" :y="96" name="resume" persist-position-key="portfolio:icon:v1:resume">
        <template #icon>
          <img src="../assets/resume.png" alt="" />
        </template>
        <template #title>
          <p class="app-name">Resume</p>
        </template>
      </Application>
      <Application
        :x="112"
        :y="96"
        name="experiments"
        persist-position-key="portfolio:icon:v1:experiments"
      >
        <template #icon>
          <img src="../assets/experiments.ico" alt="" />
        </template>
        <template #title>
          <p class="app-name">Experiments</p>
        </template>
      </Application>
      <Application
        :x="212"
        :y="96"
        name="projects"
        persist-position-key="portfolio:icon:v1:projects"
      >
        <template #icon>
          <img src="../assets/experiments.ico" alt="" />
        </template>
        <template #title>
          <p class="app-name">Projects</p>
        </template>
      </Application>
      <Application
        :x="312"
        :y="96"
        name="misc-links"
        persist-position-key="portfolio:icon:v1:misc-links"
      >
        <template #icon>
          <img src="../assets/misc-links.ico" alt="" />
        </template>
        <template #title>
          <p class="app-name">Misc. Links</p>
        </template>
      </Application>
    </nav>
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
.applications {
  position: absolute;
  inset: 0;
}
.applications :deep(.app) {
  position: absolute;
  width: 5.5rem;
  min-width: 0;
  align-items: center;
  justify-self: stretch;
}
.app-name {
  color: white;
  font-family: px_sans_nouveaux;
}

@media (max-width: 720px) {
  .content {
    overflow-y: auto;
  }

  .applications {
    top: 0.75rem;
    right: 0.75rem;
    bottom: auto;
    left: 0.75rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 4.5rem;
    gap: 0.75rem 0.25rem;
  }

  .applications :deep(.app) {
    position: static !important;
    width: 100%;
    touch-action: auto;
  }
}

@media (max-width: 430px) {
  .applications {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
