<template>
  <section class="snake-game" aria-labelledby="snake-heading" @pointerdown="focusGame">
    <h2 id="snake-heading" class="snake-game__sr-only">Snake</h2>

    <nav class="snake-game__menu" aria-label="Game menu">
      <button type="button" @click.stop="resetGame"><u>G</u>ame</button>
      <button type="button" @click.stop="togglePause">
        {{ status === 'paused' ? 'Resume' : 'Pause' }}
      </button>
      <button
        type="button"
        :aria-pressed="soundsEnabled"
        :aria-label="soundsEnabled ? 'Mute game sounds' : 'Enable game sounds'"
        @click.stop="toggleSounds"
      >
        Sound: {{ soundsEnabled ? 'On' : 'Off' }}
      </button>
      <span>Arrow keys / WASD</span>
    </nav>

    <div class="snake-game__scorebar" aria-label="Game status">
      <span>SCORE&nbsp; {{ score.toString().padStart(4, '0') }}</span>
      <strong>{{ phaseLabel }}</strong>
      <span>BEST&nbsp; {{ bestScore.toString().padStart(4, '0') }}</span>
    </div>

    <div class="snake-game__screen">
      <div
        ref="boardElement"
        class="snake-game__board"
        role="application"
        aria-label="Snake game board. Use arrow keys or W A S D to steer."
        tabindex="0"
        @keydown="handleKeydown"
      >
        <span
          v-for="cell in cells"
          :key="cell.key"
          class="snake-game__cell"
          :class="{
            'snake-game__cell--snake': cell.isSnake,
            'snake-game__cell--head': cell.isHead,
            'snake-game__cell--food': cell.isFood,
          }"
          aria-hidden="true"
        ></span>

        <div v-if="status !== 'running'" class="snake-game__message" aria-live="polite">
          <strong>{{ message.title }}</strong>
          <span>{{ message.subtitle }}</span>
          <button type="button" @click.stop="primaryAction">{{ message.button }}</button>
        </div>
      </div>
    </div>

    <p class="snake-game__status" aria-live="polite">{{ accessibleStatus }}</p>

    <div class="snake-game__controls" aria-label="Touch controls">
      <button type="button" aria-label="Move up" @click="turn('up')">▲</button>
      <div>
        <button type="button" aria-label="Move left" @click="turn('left')">◀</button>
        <button
          type="button"
          :aria-label="status === 'paused' ? 'Resume game' : 'Pause game'"
          @click="togglePause"
        >
          {{ status === 'paused' ? '▶' : 'Ⅱ' }}
        </button>
        <button type="button" aria-label="Move right" @click="turn('right')">▶</button>
      </div>
      <button type="button" aria-label="Move down" @click="turn('down')">▼</button>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const BOARD_SIZE = 18
const STARTING_SNAKE = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
]
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const snake = ref(STARTING_SNAKE.map((segment) => ({ ...segment })))
const food = ref({ x: 13, y: 9 })
const direction = ref(DIRECTIONS.right)
const nextDirection = ref(DIRECTIONS.right)
const status = ref('ready')
const score = ref(0)
const bestScore = ref(0)
const soundsEnabled = ref(true)
const boardElement = ref(null)
let timer = null
let audioContext = null

const snakeCells = computed(() => new Set(snake.value.map(({ x, y }) => `${x}-${y}`)))
const cells = computed(() =>
  Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
    const x = index % BOARD_SIZE
    const y = Math.floor(index / BOARD_SIZE)
    const key = `${x}-${y}`
    return {
      key,
      isSnake: snakeCells.value.has(key),
      isHead: snake.value[0].x === x && snake.value[0].y === y,
      isFood: food.value.x === x && food.value.y === y,
    }
  })
)

const message = computed(() => {
  if (status.value === 'paused') {
    return { title: 'PAUSED', subtitle: 'Take a breather.', button: 'RESUME' }
  }
  if (status.value === 'over') {
    return { title: 'GAME OVER', subtitle: `Score: ${score.value}`, button: 'TRY AGAIN' }
  }
  if (status.value === 'won') {
    return { title: 'YOU WIN!', subtitle: 'The whole board is yours.', button: 'PLAY AGAIN' }
  }
  return { title: 'SNAKE', subtitle: 'Eat the red pixels. Avoid yourself.', button: 'START GAME' }
})

const accessibleStatus = computed(() => {
  if (status.value === 'running') return `Game running. Score ${score.value}.`
  return `${message.value.title}. ${message.value.subtitle}`
})

const phaseLabel = computed(() => {
  if (status.value === 'running') return 'RUNNING'
  if (status.value === 'paused') return 'PAUSED'
  if (status.value === 'over') return 'GAME OVER'
  if (status.value === 'won') return 'YOU WIN'
  return 'READY'
})

function startLoop() {
  window.clearInterval(timer)
  timer = window.setInterval(tick, 125)
}

function stopLoop() {
  window.clearInterval(timer)
  timer = null
}

function getAudioContext() {
  if (!soundsEnabled.value) return null
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) audioContext = new AudioContextClass()
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

function playTone(frequency, duration, delay = 0, volume = 0.035) {
  const context = getAudioContext()
  if (!context) return

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const startsAt = context.currentTime + delay
  const endsAt = startsAt + duration

  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(frequency, startsAt)
  gain.gain.setValueAtTime(0.0001, startsAt)
  gain.gain.exponentialRampToValueAtTime(volume, startsAt + 0.008)
  gain.gain.setValueAtTime(volume, Math.max(startsAt + 0.008, endsAt - 0.025))
  gain.gain.exponentialRampToValueAtTime(0.0001, endsAt)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(startsAt)
  oscillator.stop(endsAt + 0.01)
}

function playSound(name) {
  if (name === 'eat') {
    playTone(740, 0.045, 0, 0.025)
    playTone(980, 0.055, 0.045, 0.025)
  } else if (name === 'start') {
    playTone(330, 0.06)
    playTone(494, 0.06, 0.07)
    playTone(660, 0.09, 0.14)
  } else if (name === 'pause') {
    playTone(440, 0.055, 0, 0.025)
    playTone(330, 0.075, 0.06, 0.025)
  } else if (name === 'win') {
    playTone(523, 0.08)
    playTone(659, 0.08, 0.09)
    playTone(784, 0.08, 0.18)
    playTone(1047, 0.16, 0.27)
  } else if (name === 'crash') {
    playTone(220, 0.09, 0, 0.045)
    playTone(147, 0.12, 0.08, 0.045)
    playTone(82, 0.2, 0.18, 0.045)
  }
}

function toggleSounds() {
  soundsEnabled.value = !soundsEnabled.value
  try {
    window.localStorage.setItem('portfolio:snake:sounds', soundsEnabled.value ? 'on' : 'off')
  } catch {
    // Sound preferences remain available for the current session.
  }
  if (soundsEnabled.value) playSound('start')
  boardElement.value?.focus()
}

function startGame() {
  if (status.value === 'over' || status.value === 'won') resetBoard()
  status.value = 'running'
  startLoop()
  playSound('start')
  nextTick(() => boardElement.value?.focus())
}

function resetBoard() {
  snake.value = STARTING_SNAKE.map((segment) => ({ ...segment }))
  food.value = { x: 13, y: 9 }
  direction.value = DIRECTIONS.right
  nextDirection.value = DIRECTIONS.right
  score.value = 0
}

function resetGame() {
  stopLoop()
  resetBoard()
  status.value = 'ready'
  nextTick(() => boardElement.value?.focus())
}

function endGame(nextStatus = 'over') {
  stopLoop()
  status.value = nextStatus
  playSound(nextStatus === 'won' ? 'win' : 'crash')
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    try {
      window.localStorage.setItem('portfolio:snake:best-score', String(bestScore.value))
    } catch {
      // The game still works when storage is unavailable.
    }
  }
}

function placeFood(occupied) {
  const openCells = []
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!occupied.has(`${x}-${y}`)) openCells.push({ x, y })
    }
  }
  if (!openCells.length) {
    endGame('won')
    return
  }
  food.value = openCells[Math.floor(Math.random() * openCells.length)]
}

function tick() {
  direction.value = nextDirection.value
  const head = snake.value[0]
  const nextHead = {
    x: head.x + direction.value.x,
    y: head.y + direction.value.y,
  }
  const ateFood = nextHead.x === food.value.x && nextHead.y === food.value.y
  const collisionBody = ateFood ? snake.value : snake.value.slice(0, -1)
  const hitWall =
    nextHead.x < 0 || nextHead.x >= BOARD_SIZE || nextHead.y < 0 || nextHead.y >= BOARD_SIZE
  const hitSnake = collisionBody.some(({ x, y }) => x === nextHead.x && y === nextHead.y)

  if (hitWall || hitSnake) {
    endGame()
    return
  }

  const nextSnake = [nextHead, ...snake.value]
  if (ateFood) {
    score.value += 10
    playSound('eat')
    snake.value = nextSnake
    placeFood(new Set(nextSnake.map(({ x, y }) => `${x}-${y}`)))
  } else {
    nextSnake.pop()
    snake.value = nextSnake
  }
}

function turn(name) {
  const candidate = DIRECTIONS[name]
  if (!candidate) return
  const isOpposite = candidate.x + direction.value.x === 0 && candidate.y + direction.value.y === 0
  if (isOpposite) return

  nextDirection.value = candidate
  if (status.value === 'ready') startGame()
  boardElement.value?.focus()
}

function togglePause() {
  if (status.value === 'ready' || status.value === 'over' || status.value === 'won') {
    startGame()
  } else if (status.value === 'running') {
    stopLoop()
    status.value = 'paused'
    playSound('pause')
  } else {
    status.value = 'running'
    startLoop()
    playSound('start')
  }
  boardElement.value?.focus()
}

function primaryAction() {
  if (status.value === 'paused') togglePause()
  else startGame()
}

function handleKeydown(event) {
  const keyMap = {
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
  }
  if (keyMap[event.key]) {
    event.preventDefault()
    turn(keyMap[event.key])
  } else if (event.code === 'Space') {
    event.preventDefault()
    togglePause()
  }
}

function focusGame() {
  boardElement.value?.focus({ preventScroll: true })
}

onMounted(() => {
  try {
    bestScore.value = Number(window.localStorage.getItem('portfolio:snake:best-score')) || 0
    soundsEnabled.value = window.localStorage.getItem('portfolio:snake:sounds') !== 'off'
  } catch {
    bestScore.value = 0
  }
})

onBeforeUnmount(() => {
  stopLoop()
  audioContext?.close()
})
</script>

<style lang="scss" scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  color: #111;
  background: silver;
  user-select: none;
}

.snake-game__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.snake-game__menu {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  min-height: 1.75rem;
  padding: 0 0.35rem;
  border-bottom: 1px solid #808080;
  box-shadow: 0 1px #fff;
}

.snake-game__menu button {
  min-width: 0;
  min-height: 0;
  padding: 0.3rem 0.5rem;
  background: transparent;
  border: 1px solid transparent;
}

.snake-game__menu button:hover,
.snake-game__menu button:focus-visible {
  color: #fff;
  background: navy;
  outline: none;
}

.snake-game__menu span {
  margin-left: auto;
  padding-right: 0.35rem;
  color: #404040;
  font-family: Arial, sans-serif;
  font-size: 0.65rem;
}

.snake-game__scorebar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  flex: 0 0 auto;
  margin: 0.45rem 0.5rem 0;
  padding: 0.35rem 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: clamp(0.65rem, 2vw, 0.85rem);
  background: #b8b8b8;
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
}

.snake-game__scorebar strong {
  color: navy;
  font: inherit;
  font-weight: 700;
}

.snake-game__scorebar span:last-child {
  text-align: right;
}

.snake-game__screen {
  container-type: size;
  display: grid;
  place-items: center;
  flex: 1 1 0;
  width: calc(100% - 1rem);
  min-height: 15rem;
  margin: 0.45rem 0.5rem 0.5rem;
  padding: 6px;
  background: #808080;
  border: 3px solid;
  border-color: #404040 #fff #fff #404040;
}

.snake-game__board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  width: min(100cqw, 100cqh);
  height: min(100cqw, 100cqh);
  overflow: hidden;
  background: #a8b98b;
  outline: none;
  box-shadow: inset 0 0 0 2px #1d2916;
}

.snake-game__board:focus-visible {
  outline: 3px solid #ffdf00;
  outline-offset: 3px;
}

.snake-game__cell {
  position: relative;
  border: 1px solid rgb(38 57 29 / 9%);
}

.snake-game__cell--snake::before,
.snake-game__cell--food::before {
  content: '';
  position: absolute;
  inset: 12%;
}

.snake-game__cell--snake::before {
  background: #172312;
  box-shadow: inset -2px -2px #32492a;
}

.snake-game__cell--head::before {
  background: #0b1308;
  box-shadow: inset 0 0 0 2px #314529;
}

.snake-game__cell--head::after {
  content: '';
  position: absolute;
  top: 27%;
  left: 27%;
  width: 15%;
  aspect-ratio: 1;
  background: #a8b98b;
  box-shadow: 200% 0 #a8b98b;
}

.snake-game__cell--food::before {
  inset: 18%;
  background: #a31919;
  border-radius: 50%;
  box-shadow: inset -2px -2px #5d0808;
  animation: food-blink 0.7s steps(2, end) infinite;
}

.snake-game__message {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 1rem;
  background: rgb(168 185 139 / 88%);
  text-align: center;
}

.snake-game__message strong {
  font-size: clamp(1.5rem, 7vw, 2.5rem);
  text-shadow: 2px 2px #dde8cc;
}

.snake-game__message span {
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
}

.snake-game button {
  min-width: 2.35rem;
  min-height: 2.1rem;
  padding: 0.35rem 0.65rem;
  color: #111;
  background: silver;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  cursor: pointer;
}

.snake-game button:active {
  border-color: #404040 #fff #fff #404040;
  transform: translate(1px, 1px);
}

.snake-game__status {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.snake-game__controls {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.65rem;
}

.snake-game__controls > div {
  display: flex;
  gap: 0.2rem;
}

@keyframes food-blink {
  50% {
    opacity: 0.55;
  }
}

@media (max-width: 720px), (pointer: coarse) {
  .snake-game__controls {
    display: flex;
    flex: 0 0 auto;
    margin: 0 0 0.5rem;
  }

  .snake-game__menu span {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .snake-game__cell--food::before {
    animation: none;
  }
}
</style>
