import { defineStore } from 'pinia'
import Modal from '@/models/modal.js'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    modals: [
      new Modal('welcome', 'Welcome', true),
      new Modal('contact', 'Contact'),
      new Modal('resume', 'Résumé'),
      new Modal('blog', 'Blog'),
      new Modal('photography', 'Photography'),
      new Modal('experiments', 'Experiments'),
      new Modal('projects', 'Projects'),
      new Modal('misc-links', 'Misc. Links'),
    ],
    topZIndex: 100,
  }),
  getters: {
    getIsOpen: (state) => {
      return (name) => state.modals.find((modal) => modal.name === name)?.isOpen || false
    },
    getisMinimized: (state) => {
      return (name) => state.modals.find((modal) => modal.name === name)?.isMinimized || false
    },
    getModal: (state) => {
      return (name) => state.modals.find((modal) => modal.name === name)
    },
    getAllMinimized: (state) => {
      return state.modals
        .filter((modal) => modal.isMinimized)
        .map((modal) => ({ name: modal.name, label: modal.label }))
    },
  },
  actions: {
    openModal(name) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) {
        modal.isOpen = true
        modal.isMinimized = false
        this.bringToFront(name)
      }
    },
    closeModal(name) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) {
        modal.isOpen = false
        modal.isMinimized = false
      }
    },
    minimizeModal(name, value) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) {
        modal.isMinimized = value
        if (!value) this.bringToFront(name)
      }
    },
    bringToFront(name) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (!modal) return
      this.topZIndex += 1
      modal.zIndex = this.topZIndex
    },
  },
})
