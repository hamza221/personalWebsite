<template>
  <button ref="app" @dragstart.prevent class="app">
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
export default {
  name: 'Application',
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      app: null,
      parent: null,
    }
  },

  mounted() {
    ;(this.app = this.$refs.app), (this.parent = this.$refs.app.parentElement)
    this.drag()
    this.app.style.left = `${this.x}px`
    this.app.style.top = `${this.y}px`
    window.addEventListener('resize', this.handleWindowResize)
  },
  methods: {
    handleWindowResize() {
      if (
        parseInt(this.app.style.left.split('px')[0]) + this.app.clientWidth >
        this.parent.clientWidth
      ) {
        this.app.style.left = `${this.parent.clientWidth - this.app.clientWidth}px`
      }
      if (parseInt(this.app.style.top.split('px')[0]) > this.parent.clientY) {
        this.app.style.top = `${this.parent.clientHeight - this.app.clientHeight}px`
      }
    },
    drag() {
      const self = this
      this.app.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop)
      })
      function move(e) {
        moveLeft(e)
        moveTop(e)
      }

      function stop() {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', stop)
      }
      function moveLeft(e) {
        if (e.clientX + self.app.clientWidth > self.parent.clientWidth) {
          self.app.style.left = `${self.parent.clientWidth - self.app.clientWidth}px`
        } else if (e.clientX < 0) {
          self.app.style.left = `0px`
        } else {
          self.app.style.left = `${e.clientX}px`
        }
      }
      function moveTop(e) {
        if (e.clientY + self.app.clientHeight > self.parent.clientHeight) {
          self.app.style.top = `${self.parent.clientHeight - self.app.clientHeight}px`
          return
        } else if (e.clientY < 0) {
          self.app.style.top = `0px`
          return
        } else {
          self.app.style.top = `${e.clientY}px`
        }
      }
    },
  },
}
</script>
