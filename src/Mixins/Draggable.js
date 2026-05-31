export default {
  props: {
    x: {
      type: Number,
      default: 100,
    },
    y: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      item: null,
      parent: null,
      oldLeft: 0,
      oldTop: 0,
      _mousedownHandler: null,
    }
  },
  mounted() {
    this.item = this.$refs.item
    this.parent = this.$refs.item.parentElement
    this.drag()
    this.item.style.left = `${this.x}px`
    this.item.style.top = `${this.y}px`
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    if (this._mousedownHandler && this.item) {
      this.item.removeEventListener('mousedown', this._mousedownHandler)
    }
  },
  methods: {
    handleWindowResize() {
      if (
        parseInt(this.item.style.left.split('px')[0]) + this.item.clientWidth >
        this.parent.clientWidth
      ) {
        this.item.style.left = `${this.parent.clientWidth - this.item.clientWidth}px`
      }
      if (parseInt(this.item.style.top.split('px')[0]) > this.parent.clientHeight) {
        this.item.style.top = `${this.parent.clientHeight - this.item.clientHeight}px`
      }
    },
    drag() {
      const self = this

      function move(e) {
        moveLeft(e)
        moveTop(e)
      }

      function stop() {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', stop)
        self.oldLeft = 0
        self.oldTop = 0
      }

      function moveLeft(e) {
        if (self.item.offsetLeft + self.item.clientWidth > self.parent.clientWidth) {
          self.item.style.left = `${self.parent.clientWidth - self.item.clientWidth}px`
        } else if (self.item.offsetLeft < 0) {
          self.item.style.left = `0px`
        } else if (self.oldLeft !== 0) {
          self.item.style.left = `${self.item.offsetLeft + (e.clientX - self.oldLeft)}px`
        }
        self.oldLeft = e.clientX
      }

      function moveTop(e) {
        if (self.item.offsetTop + self.item.clientHeight > self.parent.clientHeight) {
          self.item.style.top = `${self.parent.clientHeight - self.item.clientHeight}px`
        } else if (self.item.offsetTop < 0) {
          self.item.style.top = `0px`
        } else if (self.oldTop !== 0) {
          self.item.style.top = `${self.item.offsetTop + (e.clientY - self.oldTop)}px`
        }
        self.oldTop = e.clientY
      }

      this._mousedownHandler = () => {
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop)
      }
      this.item.addEventListener('mousedown', this._mousedownHandler)
    },
  },
}
