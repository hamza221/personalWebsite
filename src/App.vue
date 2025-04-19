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

  <main class="main">
    <ToolBar @toggle-start-menu="toggleStartMenu" />
    <Body></Body>
    <StartMenu v-if="isStartMenuOpen">
      <MenuButton name="resume">
        <template #icon>
          <img src="./assets/resume.png" alt="resume Icon" />
        </template>
        About me
      </MenuButton>
      <MenuButton name="contact">
        <template #icon>
          <img src="./assets/contact.png" alt="resume Icon" />
        </template>
        Contact
      </MenuButton>
      <MenuButton name="browser">
        <template #icon>
          <img src="./assets/internet.png" alt="resume Icon" />
        </template>
        Browser
      </MenuButton>
      <MenuButton name="photography">
        <template #icon>
          <img src="./assets/photgraphy.png" alt="resume Icon" />
        </template>
        Photos
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
