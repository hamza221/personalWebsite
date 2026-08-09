<template>
  <div
    class="Modal"
    :class="{ fullscreen: fullscreen, minimized: minimized }"
    :style="{ zIndex }"
    role="dialog"
    :aria-labelledby="`${name}-window-title`"
    tabindex="-1"
    @dragstart.prevent
    @pointerdown="$emit('activate')"
    @keydown.esc.stop="handleClose"
    ref="item"
  >
    <div class="Modal__header">
      <h1 :id="`${name}-window-title`" class="Modal__header__title">{{ title }}</h1>
      <div class="Modal__header__actions">
        <button
          class="Modal__header__actions__action"
          type="button"
          aria-label="Minimize window"
          @click="handleMinimize"
        >
          <span aria-hidden="true">−</span>
        </button>
        <button
          class="Modal__header__actions__action"
          type="button"
          :aria-label="fullscreen ? 'Restore window' : 'Maximize window'"
          @click="handleMaximize"
        >
          <div class="Modal__header__actions__action__maximize" aria-hidden="true"></div>
        </button>
        <button
          class="Modal__header__actions__action"
          type="button"
          aria-label="Close window"
          @click="handleClose"
        >
          <img src="@/assets/close.png" alt="" />
        </button>
      </div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <button
      v-if="!fullscreen"
      class="Modal__resize-handle"
      type="button"
      aria-label="Resize window"
      title="Drag or use arrow keys to resize"
      @pointerdown.stop="startResize"
      @keydown="handleResizeKeydown"
    ></button>
  </div>
</template>
<script>
import Draggable from '@/Mixins/Draggable'
import eventBus from '@/eventBus'
export default {
  name: 'Modal',
  mixins: [Draggable],
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    minimized: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      fullscreen: false,
      dragHandleSelector: '.Modal__header',
      _resizeMoveHandler: null,
      _resizeEndHandler: null,
    }
  },
  mounted() {
    this.$refs.item.focus({ preventScroll: true })
  },
  beforeUnmount() {
    document.removeEventListener('pointermove', this._resizeMoveHandler)
    document.removeEventListener('pointerup', this._resizeEndHandler)
  },
  methods: {
    handleMaximize() {
      this.fullscreen = !this.fullscreen
      this.$emit('maximize', this.fullscreen)
    },
    handleClose() {
      eventBus.emit('closeApp', { name: this.name })
    },
    handleMinimize() {
      eventBus.emit('minimizeApp', { name: this.name })
    },
    setWindowSize(width, height) {
      const minWidth = 280
      const minHeight = 220
      const maxWidth = Math.max(minWidth, this.parent.clientWidth - this.item.offsetLeft)
      const maxHeight = Math.max(minHeight, this.parent.clientHeight - this.item.offsetTop)

      this.item.style.width = `${Math.min(Math.max(minWidth, width), maxWidth)}px`
      this.item.style.height = `${Math.min(Math.max(minHeight, height), maxHeight)}px`
    },
    startResize(event) {
      if (this.fullscreen || this.isCompactLayout()) return

      event.preventDefault()
      this.$emit('activate')
      const startX = event.clientX
      const startY = event.clientY
      const startWidth = this.item.offsetWidth
      const startHeight = this.item.offsetHeight

      this._resizeMoveHandler = (moveEvent) => {
        this.setWindowSize(
          startWidth + moveEvent.clientX - startX,
          startHeight + moveEvent.clientY - startY
        )
      }
      this._resizeEndHandler = () => {
        document.removeEventListener('pointermove', this._resizeMoveHandler)
        document.removeEventListener('pointerup', this._resizeEndHandler)
      }

      document.addEventListener('pointermove', this._resizeMoveHandler)
      document.addEventListener('pointerup', this._resizeEndHandler)
    },
    handleResizeKeydown(event) {
      if (this.fullscreen || this.isCompactLayout()) return

      const step = event.shiftKey ? 40 : 10
      let width = this.item.offsetWidth
      let height = this.item.offsetHeight

      if (event.key === 'ArrowRight') width += step
      else if (event.key === 'ArrowLeft') width -= step
      else if (event.key === 'ArrowDown') height += step
      else if (event.key === 'ArrowUp') height -= step
      else return

      event.preventDefault()
      this.setWindowSize(width, height)
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
.content {
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow-y: scroll;
}
.Modal {
  pointer-events: auto;
  position: absolute;
  z-index: 100;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  outline: none;
  overflow: hidden;
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
    cursor: move;
    touch-action: none;
    &__title {
      color: white;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 0.025em;
      font-family: Arial, sans-serif;
    }
    &__actions {
      display: flex;
      gap: 0.25rem;
      &__action {
        color: #000;
        background-color: silver;
        height: 22px;
        width: 22px;
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
  &__resize-handle {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 2;
    width: 18px;
    height: 18px;
    padding: 0;
    background:
      linear-gradient(135deg, transparent 45%, #404040 46%, #404040 54%, transparent 55%) 8px 8px /
        8px 8px no-repeat,
      linear-gradient(135deg, transparent 45%, #404040 46%, #404040 54%, transparent 55%) 4px 4px /
        12px 12px no-repeat,
      silver;
    border: 0;
    cursor: nwse-resize;
  }

  &__resize-handle:focus-visible {
    outline: 2px solid #ffdf00;
    outline-offset: -2px;
  }
}

@media (max-width: 720px) {
  .Modal {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    left: 0.5rem !important;
    top: 0.5rem !important;

    &__header__actions__action {
      width: 32px;
      height: 28px;
    }

    &__resize-handle {
      display: none;
    }
  }
}
</style>
