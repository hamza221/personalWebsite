<template>
  <section class="coming-soon" :aria-labelledby="`${kind}-coming-soon-title`">
    <div class="coming-soon__icon" aria-hidden="true">{{ icon }}</div>
    <p class="coming-soon__eyebrow">WORK IN PROGRESS</p>
    <h2 :id="`${kind}-coming-soon-title`">{{ title }} is coming soon</h2>
    <p>
      I’m giving this space the time and dedication it deserves. It’ll be ready when there’s
      something worth sharing—not just something to fill the window.
    </p>
    <button class="xp-button" type="button" @click="openApp('contact')">
      Say hello in the meantime
    </button>
  </section>
</template>

<script setup>
import { openApp } from '@/xp/desktop'

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
</script>

<style scoped>
.coming-soon {
  min-height: 100%;
  padding: 24px;
  display: grid;
  place-content: center;
  justify-items: start;
  gap: 12px;
  background: white;
  user-select: text;
}

.coming-soon__icon {
  font-size: clamp(40px, 8vw, 64px);
}

.coming-soon__eyebrow {
  color: var(--blue);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.12em;
}

h2 {
  max-width: 18ch;
  color: #1e3a8a;
  font:
    bold clamp(20px, 4vw, 28px) / 1.1 'Trebuchet MS',
    Tahoma,
    sans-serif;
}

p:not(.coming-soon__eyebrow) {
  max-width: 56ch;
  line-height: 1.6;
}
</style>
