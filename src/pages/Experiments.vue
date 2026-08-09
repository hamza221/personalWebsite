<template>
  <section class="experiments" aria-labelledby="experiments-heading">
    <div class="experiments__intro">
      <p class="experiments__eyebrow">SIDE PROJECTS</p>
      <h2 id="experiments-heading">Experiments</h2>
      <p>Small ideas, playful tools, and projects built to learn something new.</p>
    </div>

    <nav class="experiments__apps" aria-label="Experiment projects">
      <Application :movable="false" name="trueclock" href="https://www.trueclock.space/">
        <template #icon>
          <img src="../assets/trueclock.svg" alt="" />
        </template>
        <template #title>
          <p>True Clock</p>
        </template>
      </Application>

      <Application :movable="false" name="keyboard" href="https://monkey.hamzamahjoubi.com/">
        <template #icon>
          <img src="../assets/keyboard.svg" alt="" />
        </template>
        <template #title>
          <p>Keyboard</p>
        </template>
      </Application>

      <Application :movable="false" name="cafe" href="https://remote-work.cafe/">
        <template #icon>
          <img src="../assets/cafe.svg" alt="" />
        </template>
        <template #title>
          <p>Café</p>
        </template>
      </Application>

      <Application :movable="false" name="bentobox" href="https://www.bentobox.tools/">
        <template #icon>
          <img src="../assets/bentobox.svg" alt="" />
        </template>
        <template #title>
          <p>BentoBox</p>
        </template>
      </Application>
    </nav>
  </section>
</template>

<script setup>
import Application from '@/components/Application.vue'
</script>

<style lang="scss" scoped>
.experiments {
  min-height: 100%;
  padding: clamp(1rem, 4vw, 2rem);
  color: #111;
  background: #f7f3e8;
}

.experiments__intro {
  margin-bottom: 1.5rem;
}

.experiments__eyebrow {
  color: var(--blue);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

h2 {
  margin: 0.35rem 0;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

.experiments__intro > p:last-child {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.experiments__apps {
  display: grid;
  grid-template-columns: repeat(3, minmax(5.5rem, 1fr));
  gap: 1rem;
}

.experiments__apps :deep(.app) {
  position: static;
  width: 100%;
  align-items: center;
  color: #111;
}

.experiments__apps :deep(.app p) {
  color: #111;
}

.experiments__apps :deep(.app:hover p),
.experiments__apps :deep(.app:focus-visible p) {
  color: white;
}

@media (max-width: 430px) {
  .experiments__apps {
    grid-template-columns: repeat(2, minmax(5.5rem, 1fr));
  }
}
</style>
