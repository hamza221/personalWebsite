<template>
  <section class="experiments" aria-labelledby="experiments-heading">
    <div class="experiments__intro">
      <p class="experiments__eyebrow">SIDE PROJECTS</p>
      <h2 id="experiments-heading">Experiments</h2>
      <p>Small ideas, playful tools, and projects built to learn something new.</p>
    </div>

    <nav class="experiments__apps" aria-label="Experiment projects">
      <LinkTile href="https://www.trueclock.space/" :icon="trueclockIcon" label="True Clock" />
      <LinkTile href="https://monkey.hamzamahjoubi.com/" :icon="keyboardIcon" label="Keyboard" />
      <LinkTile href="https://remote-work.cafe/" :icon="cafeIcon" label="Café" />
      <LinkTile href="https://www.bentobox.tools/" :icon="bentoboxIcon" label="BentoBox" />
    </nav>
  </section>
</template>

<script setup>
import LinkTile from '@/components/LinkTile.vue'
import trueclockIcon from '@/assets/trueclock.svg'
import keyboardIcon from '@/assets/keyboard.svg'
import cafeIcon from '@/assets/cafe.svg'
import bentoboxIcon from '@/assets/bentobox.svg'
</script>

<style scoped>
.experiments {
  min-height: 100%;
  padding: 16px;
  background: white;
}

.experiments__intro {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #d5d1c2;
}

.experiments__eyebrow {
  color: var(--blue);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.1em;
}

h2 {
  margin: 4px 0;
  color: #1e3a8a;
  font:
    bold 22px 'Trebuchet MS',
    Tahoma,
    sans-serif;
}

.experiments__apps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 12px;
}
</style>
