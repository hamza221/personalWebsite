// Window ids are `app-<name>`; wxp owns window state (open, minimized, z-order).
export const windowId = (name) => `app-${name}`

export function openApp(name) {
  const win = document.getElementById(windowId(name))
  if (!win) return
  if (win.hidden) win.restore()
  else {
    win.activate()
    win.bar.focus({ preventScroll: true })
  }
}
