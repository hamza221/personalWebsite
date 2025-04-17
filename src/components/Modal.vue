<template>
  <div class="Modal" :class="{ fullscreen: fullscreen }" @dragstart.prevent ref="item">
    <div class="Modal__header">
      <h1 class="Modal__header__title">{{ title }}</h1>
      <div class="Modal__header__actions">
        <button class="Modal__header__actions__action" @click="$emit('close')">
          <slot name="close"></slot>
        </button>
        <button class="Modal__header__actions__action" @click="$emit('minimize')">
          <slot name="minimize"></slot>
        </button>
        <button class="Modal__header__actions__action" @click="handleMaximize">
          <slot name="maximize"></slot>
        </button>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Draggable from '@/Mixins/Draggable'
export default {
  name: 'Modal',
  mixins: [Draggable],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fullscreen: false,
    }
  },
  methods: {
    handleMaximize() {
      this.fullscreen = !this.fullscreen
      this.$emit('maximize', this.fullscreen)
    },
  },
}
</script>
<style lang="scss" scoped>
.fullscreen {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  top: 0;
  left: 0;
}
.Modal {
  pointer-events: auto;
  position: relative;
  z-index: 100;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background-color: white;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    background-color: var(--blue);
    &__title {
      color: white;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 0.025em;
      font-family: Arial, sans-serif;
    }
    &__actions {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
