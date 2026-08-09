<template>
  <button
    ref="item"
    class="app"
    :data-app-name="name"
    type="button"
    :title="movable ? 'Drag to move. Use Shift + arrow keys for precise movement.' : undefined"
    @dragstart.prevent
    @click="handleClick"
    @keydown="handlePositionKeydown"
  >
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <slot name="title"></slot>
  </button>
</template>
<style lang="scss" scoped>
.icon {
  height: 32px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
}
.app {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0.25rem;
  font-size: 10px;
  background-color: unset;
  border: 1px solid transparent;
  cursor: pointer;
  touch-action: none;
}
.app:hover,
.app:focus-visible {
  background-color: var(--blue);
  color: white;
  outline: 1px dotted white;
  outline-offset: -3px;
}
.app p {
  color: white;
}
</style>
<script>
import Draggable from '@/Mixins/Draggable'
import eventBus from '@/eventBus'

export default {
  name: 'Application',
  mixins: [Draggable],
  props: {
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (this.wasDragged()) return
      if (this.href) window.open(this.href, '_blank', 'noopener,noreferrer')
      else eventBus.emit('openApp', { name: this.name })
    },
    handlePositionKeydown(event) {
      if (!this.movable || !event.shiftKey) return

      const step = event.altKey ? 1 : 10
      if (event.key === 'ArrowRight') this.nudgePosition(step, 0)
      else if (event.key === 'ArrowLeft') this.nudgePosition(-step, 0)
      else if (event.key === 'ArrowDown') this.nudgePosition(0, step)
      else if (event.key === 'ArrowUp') this.nudgePosition(0, -step)
      else return

      event.preventDefault()
    },
  },
}
</script>
