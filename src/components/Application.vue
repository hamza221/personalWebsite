<template>
  <button ref="item" @dragstart.prevent class="app" @click="handleClick">
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
}
.app:focus {
  background-color: var(--blue);
  color: white;
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
  },
  data() {
    return {
      count: 0,
      clickTimer: null,
    }
  },
  methods: {
    handleClick() {
      this.count += 1
      if (this.count === 2) {
        eventBus.emit('openApp', { name: this.name })
        this.count = 0
      }
      window.clearTimeout(this.clickTimer)
      this.clickTimer = setTimeout(() => {
        if (this.count < 2) {
          this.count = 0
        }
      }, 500)
    },
  },
}
</script>
