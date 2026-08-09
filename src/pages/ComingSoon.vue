<template>
  <section class="coming-soon" :aria-labelledby="`${kind}-coming-soon-title`">
    <div class="coming-soon__icon" aria-hidden="true">{{ icon }}</div>
    <p class="coming-soon__eyebrow">WORK IN PROGRESS</p>
    <h2 :id="`${kind}-coming-soon-title`">{{ title }} is coming soon</h2>
    <p>
      I’m giving this space the time and dedication it deserves. It’ll be ready when there’s
      something worth sharing—not just something to fill the window.
    </p>
    <button type="button" @click="openContact">Say hello in the meantime</button>
  </section>
</template>

<script setup>
import eventBus from '@/eventBus'

defineProps({
  kind: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const openContact = () => eventBus.emit('openApp', { name: 'contact' })
</script>

<style lang="scss" scoped>
.coming-soon {
  min-height: 100%;
  padding: clamp(1.5rem, 6vw, 4rem);
  display: grid;
  place-content: center;
  justify-items: start;
  gap: 1rem;
  background:
    linear-gradient(90deg, rgb(0 0 128 / 8%) 1px, transparent 1px),
    linear-gradient(rgb(0 0 128 / 8%) 1px, transparent 1px), #f7f3e8;
  background-size: 18px 18px;
  color: #111;
  user-select: text;
}

.coming-soon__icon {
  font-size: clamp(2.5rem, 8vw, 5rem);
}

.coming-soon__eyebrow {
  color: var(--blue);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
}

h2 {
  max-width: 18ch;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.1;
}

p:not(.coming-soon__eyebrow) {
  max-width: 56ch;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

button {
  padding: 0.7rem 1rem;
  color: white;
  background: var(--blue);
  border: 2px solid;
  border-color: white #404040 #404040 white;
  cursor: pointer;
}

button:focus-visible {
  outline: 3px solid #ffdf00;
  outline-offset: 2px;
}
</style>
