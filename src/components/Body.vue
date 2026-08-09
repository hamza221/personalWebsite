<template>
  <div class="content">
    <nav
      ref="applicationsElement"
      class="applications"
      aria-label="Desktop applications"
      @pointerdown.self="startMarquee"
    >
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
      <Application :x="12" :y="180" name="snake" persist-position-key="portfolio:icon:v1:snake">
        <template #icon>
          <span class="snake-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        </template>
        <template #title>
          <p class="app-name">Snake</p>
        </template>
      </Application>
      <div
        v-if="selectionRect"
        class="selection-marquee"
        :style="{
          left: `${selectionRect.left}px`,
          top: `${selectionRect.top}px`,
          width: `${selectionRect.width}px`,
          height: `${selectionRect.height}px`,
        }"
        aria-hidden="true"
      ></div>
    </nav>
    <AllModals></AllModals>
  </div>
</template>
<script setup>
import Application from './Application.vue'
import AllModals from './AllModals.vue'
import eventBus from '@/eventBus'
import { onUnmounted, ref } from 'vue'

const applicationsElement = ref(null)
const selectionRect = ref(null)
let selectionStart = null

const stopMarquee = () => {
  document.removeEventListener('pointermove', updateMarquee)
  document.removeEventListener('pointerup', stopMarquee)
  selectionRect.value = null
  selectionStart = null
}

const updateMarquee = (event) => {
  if (!selectionStart || !applicationsElement.value) return
  const desktopRect = applicationsElement.value.getBoundingClientRect()
  const currentX = Math.min(Math.max(event.clientX - desktopRect.left, 0), desktopRect.width)
  const currentY = Math.min(Math.max(event.clientY - desktopRect.top, 0), desktopRect.height)
  const left = Math.min(selectionStart.x, currentX)
  const top = Math.min(selectionStart.y, currentY)
  const width = Math.abs(currentX - selectionStart.x)
  const height = Math.abs(currentY - selectionStart.y)

  selectionRect.value = { left, top, width, height }

  const marquee = {
    left: desktopRect.left + left,
    top: desktopRect.top + top,
    right: desktopRect.left + left + width,
    bottom: desktopRect.top + top + height,
  }
  const names = Array.from(applicationsElement.value.querySelectorAll('.app--desktop'))
    .filter((app) => {
      const appRect = app.getBoundingClientRect()
      return !(
        appRect.right < marquee.left ||
        appRect.left > marquee.right ||
        appRect.bottom < marquee.top ||
        appRect.top > marquee.bottom
      )
    })
    .map((app) => app.dataset.appName)

  eventBus.emit('selectApp', { names })
}

const startMarquee = (event) => {
  if (event.button !== 0 || window.matchMedia('(max-width: 720px)').matches) return
  event.preventDefault()
  const desktopRect = event.currentTarget.getBoundingClientRect()
  selectionStart = {
    x: event.clientX - desktopRect.left,
    y: event.clientY - desktopRect.top,
  }
  selectionRect.value = { left: selectionStart.x, top: selectionStart.y, width: 0, height: 0 }
  eventBus.emit('selectApp', { names: [] })
  document.addEventListener('pointermove', updateMarquee)
  document.addEventListener('pointerup', stopMarquee)
}

onUnmounted(stopMarquee)
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
.selection-marquee {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  background: rgb(0 0 128 / 16%);
  border: 1px dotted white;
  box-shadow: 0 0 0 1px navy;
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
.snake-icon {
  display: grid;
  grid-template-columns: repeat(4, 7px);
  grid-template-rows: repeat(4, 7px);
  width: 28px;
  height: 28px;
}
.snake-icon i {
  background: #57c93b;
  border: 1px solid #0a5308;
}
.snake-icon i:nth-child(1) {
  grid-area: 1 / 1;
}
.snake-icon i:nth-child(2) {
  grid-area: 2 / 1;
}
.snake-icon i:nth-child(3) {
  grid-area: 3 / 1;
}
.snake-icon i:nth-child(4) {
  grid-area: 3 / 2;
  box-shadow:
    7px 0 #57c93b,
    14px 0 #57c93b;
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
    touch-action: manipulation;
  }
}

@media (max-width: 430px) {
  .applications {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
