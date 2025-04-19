import { defineStore } from 'pinia'
import Modal from '@/models/modal.js'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    modals: [
      new Modal('contact'),
      new Modal('resume'),
      new Modal('browser'),
      new Modal('photography'),
    ],
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
  },
  actions: {
    openModal(name) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) modal.isOpen = true
    },
    closeModal(name) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) modal.isOpen = false
    },
    minimizeModal(name, value) {
      const modal = this.modals.find((modal) => modal.name === name)
      if (modal) modal.isMinimized = value
    },
    minimizeAllExcept(name) {
      this.modals.forEach((modal) => {
        if (modal.name !== name && modal.isOpen) {
          modal.isMinimized = true
        }
      })
    },
  },
})
