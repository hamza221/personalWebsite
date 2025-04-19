<template>
  <div
    class="Modal"
    :class="{ fullscreen: fullscreen, minimized: minimized }"
    @dragstart.prevent
    ref="item"
  >
    <div class="Modal__header">
      <h1 class="Modal__header__title">{{ title }}</h1>
      <div class="Modal__header__actions">
        <button class="Modal__header__actions__action" @click="handleClose">
          <img src="@/assets/close.png" alt="Close" />
        </button>
        <button class="Modal__header__actions__action" @click="handleMaximize">
          <div class="Modal__header__actions__action__maximize"></div>
        </button>
        <button class="Modal__header__actions__action" @click="handleMinimize">
          <span>-</span>
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
import eventBus from '@/eventBus'
export default {
  name: 'Modal',
  mixins: [Draggable],
  props: {
    title: {
      type: String,
      required: true,
    },
    minimized: {
      type: Boolean,
      default: false,
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
    handleClose() {
      eventBus.emit('closeApp', { name: this.title.toLowerCase() })
    },
    handleMinimize() {
      eventBus.emit('minimizeApp', { name: this.title.toLowerCase() })
    },
  },
}
</script>
<style lang="scss" scoped>
.fullscreen {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  top: 0 !important;
  left: 0 !important;
}
.minimized {
  display: none !important;
}
.Modal {
  pointer-events: auto;
  position: relative;
  z-index: 100;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background-color: #c6c6c6;
  border-top: 2px solid #efefef;
  border-left: 2px solid #efefef;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
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
      flex-direction: row-reverse;
      gap: 0.5rem;
      &__action {
        color: #000;
        background-color: silver;
        height: 16px;
        width: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        appearance: none;
        border-left: 2px solid #ededed;
        border-top: 2px solid #ededed;
        border-right: 2px solid #404040;
        border-bottom: 2px solid #404040;
        &__maximize {
          height: 8px;
          width: 8px;
          border: 2px solid black;
        }
      }
    }
  }
}
</style>
