<template>
  <section class="projects" aria-labelledby="projects-heading">
    <div class="projects__intro">
      <p class="projects__eyebrow">SHIPPED WORK</p>
      <h2 id="projects-heading">Projects</h2>
      <p>Products and larger builds made to be used beyond the prototype stage.</p>
    </div>

    <nav class="projects__apps" aria-label="Projects">
      <LinkTile href="https://getfennec.app/" :icon="fennecIcon" label="Fennec" />
    </nav>
  </section>
</template>

<script setup>
import LinkTile from '@/components/LinkTile.vue'
import fennecIcon from '@/assets/fennec-logo.png'
</script>

<style scoped>
.projects {
  min-height: 100%;
  padding: 16px;
  background: white;
}

.projects__intro {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #d5d1c2;
}

.projects__eyebrow {
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

.projects__apps {
  --tile-icon: 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 12px;
}
</style>
