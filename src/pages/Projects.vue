<template>
  <section class="projects" aria-labelledby="projects-heading">
    <div class="projects__intro">
      <p class="projects__eyebrow">SHIPPED WORK</p>
      <h2 id="projects-heading">Projects</h2>
      <p>Products and larger builds made to be used beyond the prototype stage.</p>
    </div>

    <nav class="projects__apps" aria-label="Projects">
      <Application :movable="false" name="fennec" href="https://getfennec.app/">
        <template #icon>
          <img src="../assets/fennec-logo.png" alt="" />
        </template>
        <template #title>
          <p>Fennec</p>
        </template>
      </Application>
    </nav>
  </section>
</template>

<script setup>
import Application from '@/components/Application.vue'
</script>

<style lang="scss" scoped>
.projects {
  min-height: 100%;
  padding: clamp(1rem, 4vw, 2rem);
  color: #111;
  background: #f7f3e8;
}

.projects__intro {
  margin-bottom: 1.5rem;
}

.projects__eyebrow {
  color: var(--blue);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

h2 {
  margin: 0.35rem 0;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

.projects__intro > p:last-child {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.projects__apps {
  display: grid;
  grid-template-columns: repeat(3, minmax(5.5rem, 1fr));
  gap: 1rem;
}

.projects__apps :deep(.app) {
  position: static;
  width: 100%;
  align-items: center;
  color: #111;
}

.projects__apps :deep(.icon) {
  height: 48px;
}

.projects__apps :deep(.icon img) {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.projects__apps :deep(.app p) {
  color: #111;
}

.projects__apps :deep(.app:hover p),
.projects__apps :deep(.app:focus-visible p) {
  color: white;
}

@media (max-width: 430px) {
  .projects__apps {
    grid-template-columns: repeat(2, minmax(5.5rem, 1fr));
  }
}
</style>
