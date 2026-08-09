<script setup>
import StartMenu from './components/StartMenu.vue'
import ToolBar from './components/ToolBar.vue'
import Body from './components/Body.vue'
import MenuButton from './components/MenuButton.vue'
import { ref } from 'vue'
const isStartMenuOpen = ref(false)
const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value
}
</script>

<template>
  <header></header>

  <main class="main" @keydown.esc="isStartMenuOpen = false">
    <ToolBar :start-menu-open="isStartMenuOpen" @toggle-start-menu="toggleStartMenu" />
    <Body></Body>
    <StartMenu v-if="isStartMenuOpen">
      <MenuButton name="welcome" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/welcome.ico" alt="" />
        </template>
        Welcome
      </MenuButton>
      <MenuButton name="resume" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/resume.png" alt="" />
        </template>
        About me
      </MenuButton>
      <MenuButton name="contact" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/contact.png" alt="" />
        </template>
        Contact
      </MenuButton>
      <MenuButton name="blog" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/internet.png" alt="" />
        </template>
        Blog
      </MenuButton>
      <MenuButton name="photography" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/photgraphy.png" alt="" />
        </template>
        Photos
      </MenuButton>
      <MenuButton name="experiments" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/experiments.ico" alt="" />
        </template>
        Experiments
      </MenuButton>
      <MenuButton name="projects" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/experiments.ico" alt="" />
        </template>
        Projects
      </MenuButton>
      <MenuButton name="misc-links" @click="toggleStartMenu">
        <template #icon>
          <img src="./assets/misc-links.ico" alt="" />
        </template>
        Misc. Links
      </MenuButton>
    </StartMenu>
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
