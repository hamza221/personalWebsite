<template>
  <button class="start-button" @click="$emit('toggle')">
    <span class="start-button__text"> Start </span>
  </button>
</template>
<script></script>
<style lang="scss" scoped>
.start-button {
  padding: 0 0.5rem;
  gap: 0.25rem;
  border: 2px solid var(--button-border-color);
  background-color: var(--tertiary-color);
  height: 2rem;
  font-size: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    inset -1px -1px 0px #000000,
    inset 1px 1px 0px #ffffff;
  &__text {
    color: var(--green);
    font-weight: 700;
    font-family: sans-serif;
  }
}
</style>
