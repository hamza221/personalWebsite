class Modal {
  constructor(name, label, isOpen = false) {
    this.name = name
    this.label = label
    this.isOpen = isOpen
    this.isMinimized = false
    this.zIndex = 100
  }
}

export default Modal
