<template>
  <section class="welcome" aria-labelledby="welcome-heading">
    <p class="welcome__eyebrow">HELLO, WORLD.</p>
    <h2 id="welcome-heading">I’m Hamza Mahjoubi.</h2>
    <p class="welcome__copy">
      A full-stack software engineer based in Madrid contributing to open-source and building silly
      apps.
    </p>
    <div class="welcome__actions">
      <button class="xp-button xp-default" type="button" @click="openApp('resume')">
        View résumé
      </button>
      <button class="xp-button" type="button" @click="openApp('contact')">Contact me</button>
    </div>
    <p class="welcome__hint">Click any desktop icon to explore.</p>
  </section>
</template>

<script setup>
import { openApp } from '@/xp/desktop'
</script>

<style scoped>
.welcome {
  min-height: 100%;
  padding: 24px;
  display: grid;
  align-content: center;
  background: linear-gradient(#fff, #ece9d8);
}

.welcome__eyebrow,
.welcome__hint {
  color: #555;
  font-size: 11px;
  letter-spacing: 0.08em;
}

h2 {
  margin: 6px 0 10px;
  color: #1e3a8a;
  font:
    bold clamp(22px, 5vw, 32px) / 1.1 'Trebuchet MS',
    Tahoma,
    sans-serif;
}

.welcome__copy {
  max-width: 44ch;
  line-height: 1.55;
}

.welcome__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}
</style>
