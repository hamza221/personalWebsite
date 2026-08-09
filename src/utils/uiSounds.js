let audioContext = null

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null

  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContextClass()
  }
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

function tone(context, frequency, startsAt, duration, volume) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const endsAt = startsAt + duration

  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(frequency, startsAt)
  gain.gain.setValueAtTime(volume, startsAt)
  gain.gain.exponentialRampToValueAtTime(0.0001, endsAt)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(startsAt)
  oscillator.stop(endsAt + 0.01)
}

export function playAppClick() {
  const context = getAudioContext()
  if (!context) return

  const now = context.currentTime
  tone(context, 920, now, 0.025, 0.025)
  tone(context, 620, now + 0.022, 0.04, 0.02)
}
