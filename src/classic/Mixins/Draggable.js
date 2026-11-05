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
    persistPositionKey: {
      type: String,
      default: null,
    },
    movable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      item: null,
      parent: null,
      dragHandleSelector: null,
      _dragMoved: false,
      _pointerDownHandler: null,
      _pointerMoveHandler: null,
      _pointerUpHandler: null,
    }
  },
  mounted() {
    this.item = this.$refs.item
    this.parent = this.$refs.item.parentElement
    if (!this.movable) return
    const savedPosition = this.getSavedPosition()
    this.item.style.left = `${savedPosition?.left ?? this.x}px`
    this.item.style.top = `${savedPosition?.top ?? this.y}px`
    this.drag()
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    const handle = this.getDragHandle()
    if (this._pointerDownHandler && handle) {
      handle.removeEventListener('pointerdown', this._pointerDownHandler)
    }
    document.removeEventListener('pointermove', this._pointerMoveHandler)
    document.removeEventListener('pointerup', this._pointerUpHandler)
  },
  methods: {
    getDragHandle() {
      return this.dragHandleSelector ? this.item?.querySelector(this.dragHandleSelector) : this.item
    },
    isCompactLayout() {
      return window.matchMedia('(max-width: 720px)').matches
    },
    wasDragged() {
      if (!this._dragMoved) return false
      this._dragMoved = false
      return true
    },
    getSavedPosition() {
      if (!this.persistPositionKey) return null

      try {
        const savedPosition = JSON.parse(window.localStorage.getItem(this.persistPositionKey))
        if (Number.isFinite(savedPosition?.left) && Number.isFinite(savedPosition?.top)) {
          return savedPosition
        }
      } catch {
        try {
          window.localStorage.removeItem(this.persistPositionKey)
        } catch {
          // Ignore unavailable storage and use the deterministic default position.
        }
      }

      return null
    },
    savePosition() {
      if (!this.persistPositionKey || this.isCompactLayout()) return

      try {
        window.localStorage.setItem(
          this.persistPositionKey,
          JSON.stringify({ left: this.item.offsetLeft, top: this.item.offsetTop })
        )
      } catch {
        // The layout remains usable when storage is unavailable or full.
      }
    },
    setPosition(left, top) {
      const maxLeft = Math.max(0, this.parent.clientWidth - this.item.clientWidth)
      const maxTop = Math.max(0, this.parent.clientHeight - this.item.clientHeight)

      this.item.style.left = `${Math.min(Math.max(0, left), maxLeft)}px`
      this.item.style.top = `${Math.min(Math.max(0, top), maxTop)}px`
    },
    nudgePosition(deltaX, deltaY) {
      if (this.isCompactLayout()) return
      this.setPosition(this.item.offsetLeft + deltaX, this.item.offsetTop + deltaY)
      this.savePosition()
    },
    handleWindowResize() {
      if (!this.movable || this.isCompactLayout()) return

      const left = Number.parseFloat(this.item.style.left) || 0
      const top = Number.parseFloat(this.item.style.top) || 0

      this.setPosition(left, top)
      this.savePosition()
    },
    drag() {
      if (!this.movable) return
      const handle = this.getDragHandle()
      if (!handle) return

      this._pointerDownHandler = (event) => {
        if (event.button !== 0 || this.isCompactLayout()) return

        const startX = event.clientX
        const startY = event.clientY
        const startLeft = this.item.offsetLeft
        const startTop = this.item.offsetTop
        this._dragMoved = false
        if (typeof this.handleDragStart === 'function') this.handleDragStart()

        this._pointerMoveHandler = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX
          const deltaY = moveEvent.clientY - startY
          if (Math.abs(deltaX) + Math.abs(deltaY) > 4) this._dragMoved = true

          this.setPosition(startLeft + deltaX, startTop + deltaY)
          if (typeof this.handleDragMove === 'function') {
            this.handleDragMove(deltaX, deltaY)
          }
        }

        this._pointerUpHandler = () => {
          document.removeEventListener('pointermove', this._pointerMoveHandler)
          document.removeEventListener('pointerup', this._pointerUpHandler)
          if (this._dragMoved) this.savePosition()
          if (typeof this.handleDragEnd === 'function') this.handleDragEnd(this._dragMoved)
        }

        document.addEventListener('pointermove', this._pointerMoveHandler)
        document.addEventListener('pointerup', this._pointerUpHandler)
      }

      handle.addEventListener('pointerdown', this._pointerDownHandler)
    },
  },
}
