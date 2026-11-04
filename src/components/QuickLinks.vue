<template>
  <nav class="quick-access" aria-label="Quick access">
    <a
      class="quick-access__button"
      href="https://github.com/hamza221"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hamza Mahjoubi on GitHub"
      title="GitHub"
    >
      <img class="quick-access__github" src="../assets/github-mark.png" alt="" />
    </a>
    <a
      class="quick-access__button"
      href="https://www.linkedin.com/in/hamza--mahjoubi/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hamza Mahjoubi on LinkedIn"
      title="LinkedIn"
    >
      <img class="quick-access__linkedin" src="../assets/linkedin-in.png" alt="" />
    </a>
  </nav>
</template>

<style scoped>
.quick-access {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quick-access__button {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
}

.quick-access__button:hover {
  background: #ffffff33;
}

.quick-access__button:focus-visible {
  outline: 1px dotted white;
}

.quick-access__button img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.quick-access__github {
  padding: 1px;
  border-radius: 50%;
  background: white;
}

.quick-access__linkedin {
  padding: 2px;
  border-radius: 2px;
  background: #0a66c2;
}
</style>
