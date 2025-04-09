<template>
  <div class="start-menu">
    <div class="start-menu__header">
      <span class="start-menu__header__text">Menu</span>
    </div>
    <div class="start-menu__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.start-menu {
  position: absolute;
  bottom: 2.5rem;
  left: 0;
  width: 12rem;
  background-color: var(--tertiary-color);
  border-width: 2px;
  border-color: var(--button-border-color);
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    inset -1px -1px 0px #000000,
    inset 1px 1px 0px #ffffff;
  &__header {
    height: 2rem;
    padding: 0 0.5rem;
    background-color: var(--blue);
    display: flex;
    align-items: center;
    &__text {
      color: white;
      font-weight: 700;
    }
  }
  &__content {
    padding: 0.25rem;
  }
}
</style>
