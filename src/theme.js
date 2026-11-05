import { ref, watchEffect } from 'vue'

export const themes = [
  { id: 'classic', label: 'Classic', description: 'The original teal desktop.', color: '#008080' },
  { id: 'xp', label: 'Windows XP', description: 'Luna desktop built with wxp.', color: '#0054e3' },
]

const storageKey = 'portfolio:theme'
const isTheme = (id) => themes.some((theme) => theme.id === id)

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(storageKey)
    return isTheme(stored) ? stored : 'classic'
  } catch {
    return 'classic'
  }
}

export const theme = ref(readStoredTheme())

export function setTheme(id) {
  if (!isTheme(id)) return
  theme.value = id
  try {
    window.localStorage.setItem(storageKey, id)
  } catch {
    // Storage can be unavailable (private mode); the choice still applies for this visit.
  }
}

watchEffect(() => {
  const color = themes.find((entry) => entry.id === theme.value).color
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
})
