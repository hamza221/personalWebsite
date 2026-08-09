<template>
  <section class="welcome" aria-labelledby="welcome-heading">
    <p class="welcome__eyebrow">HELLO, WORLD.</p>
    <h2 id="welcome-heading">I’m Hamza Mahjoubi.</h2>
    <p class="welcome__copy">
      A full-stack software engineer in Madrid building open-source and data-driven web products.
    </p>
    <div class="welcome__actions">
      <button type="button" @click="openApp('resume')">View résumé</button>
      <button type="button" @click="openApp('contact')">Contact me</button>
    </div>
    <p class="welcome__hint">Select any desktop icon to explore.</p>
  </section>
</template>

<script setup>
import eventBus from '@/eventBus'

const openApp = (name) => eventBus.emit('openApp', { name })
</script>

<style lang="scss" scoped>
.welcome {
  min-height: 100%;
  padding: clamp(1.25rem, 5vw, 2.5rem);
  display: grid;
  align-content: center;
  color: #111;
  background: silver;
}

.welcome__eyebrow,
.welcome__hint {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(1.75rem, 5vw, 3rem);
  line-height: 1.05;
}

.welcome__copy {
  max-width: 44ch;
  font-family: Arial, sans-serif;
  line-height: 1.55;
}

.welcome__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.25rem 0;
}

button {
  padding: 0.65rem 0.9rem;
  background: #e2e2e2;
  border: 2px solid;
  border-color: white #404040 #404040 white;
  cursor: pointer;
}

button:active {
  border-color: #404040 white white #404040;
}
</style>
