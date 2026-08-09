<template>
  <button
    ref="item"
    class="app"
    :class="{ 'app--desktop': movable, 'app--selected': selected }"
    :data-app-name="name"
    type="button"
    :aria-pressed="movable ? selected : undefined"
    :title="
      movable
        ? 'Click to select, then click again to open. Double click or press Enter also opens.'
        : undefined
    "
    @dragstart.prevent
    @pointerdown="prepareSelection"
    @click="handleClick"
    @dblclick="handleDoubleClick"
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
.app:not(.app--desktop):hover,
.app--selected,
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
import { playAppClick } from '@/utils/uiSounds'

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
    return {
      selected: false,
      selectedAtPointerDown: false,
      openedOnSingleClick: false,
      singleOpenTimer: null,
      groupDragOrigin: null,
    }
  },
  mounted() {
    eventBus.on('selectApp', this.handleSelection)
    eventBus.on('groupDragStart', this.onGroupDragStart)
    eventBus.on('groupDragMove', this.onGroupDragMove)
    eventBus.on('groupDragEnd', this.onGroupDragEnd)
  },
  beforeUnmount() {
    window.clearTimeout(this.singleOpenTimer)
    eventBus.off('selectApp', this.handleSelection)
    eventBus.off('groupDragStart', this.onGroupDragStart)
    eventBus.off('groupDragMove', this.onGroupDragMove)
    eventBus.off('groupDragEnd', this.onGroupDragEnd)
  },
  methods: {
    openApp() {
      playAppClick()
      if (this.href) window.open(this.href, '_blank', 'noopener,noreferrer')
      else eventBus.emit('openApp', { name: this.name })
    },
    handleClick(event) {
      if (this.wasDragged()) {
        this.selectedAtPointerDown = false
        return
      }
      if (!this.movable || event.detail === 0) {
        this.openApp()
        return
      }

      if (this.selectedAtPointerDown && event.detail === 1) {
        this.openApp()
        this.openedOnSingleClick = true
        window.clearTimeout(this.singleOpenTimer)
        this.singleOpenTimer = window.setTimeout(() => {
          this.openedOnSingleClick = false
        }, 450)
        return
      }

      eventBus.emit('selectApp', { name: this.name })
      if (event.detail === 1) playAppClick()
    },
    handleDoubleClick() {
      if (!this.movable || this.wasDragged()) return
      if (this.openedOnSingleClick) {
        this.openedOnSingleClick = false
        window.clearTimeout(this.singleOpenTimer)
        return
      }
      this.openApp()
    },
    prepareSelection(event) {
      if (!this.movable || event.button !== 0) return
      this.selectedAtPointerDown = this.selected
      if (!this.selected) eventBus.emit('selectApp', { names: [this.name] })
    },
    handleSelection(payload) {
      const selectedNames = payload?.names || (payload?.name ? [payload.name] : [])
      this.selected = this.movable && selectedNames.includes(this.name)
    },
    handleDragStart() {
      if (this.selected) eventBus.emit('groupDragStart', { source: this.name })
    },
    handleDragMove(deltaX, deltaY) {
      if (this.selected) {
        eventBus.emit('groupDragMove', { source: this.name, deltaX, deltaY })
      }
    },
    handleDragEnd(didMove) {
      if (this.selected) eventBus.emit('groupDragEnd', { source: this.name, didMove })
    },
    onGroupDragStart({ source }) {
      if (!this.selected || source === this.name || this.isCompactLayout()) return
      this.groupDragOrigin = { left: this.item.offsetLeft, top: this.item.offsetTop }
    },
    onGroupDragMove({ source, deltaX, deltaY }) {
      if (!this.selected || source === this.name || !this.groupDragOrigin) return
      this.setPosition(this.groupDragOrigin.left + deltaX, this.groupDragOrigin.top + deltaY)
    },
    onGroupDragEnd({ source, didMove }) {
      if (!this.selected || source === this.name || !this.groupDragOrigin) return
      if (didMove) this.savePosition()
      this.groupDragOrigin = null
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
