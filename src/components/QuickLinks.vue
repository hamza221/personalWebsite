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
      <span class="quick-access__screen quick-access__screen--github" aria-hidden="true">
        <img src="../assets/github-mark.png" alt="" />
      </span>
    </a>
    <a
      class="quick-access__button"
      href="https://www.linkedin.com/in/hamza--mahjoubi/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hamza Mahjoubi on LinkedIn"
      title="LinkedIn"
    >
      <span class="quick-access__screen quick-access__screen--linkedin" aria-hidden="true">
        <img src="../assets/linkedin-in.png" alt="" />
      </span>
    </a>
  </nav>
</template>

<style scoped>
.quick-access {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  margin-right: 0.25rem;
}

.quick-access__button {
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  background: var(--tertiary-color);
  border: 2px solid;
  border-color: var(--border-white-color) #404040 #404040 var(--border-white-color);
  color: inherit;
  text-decoration: none;
  box-shadow:
    inset -1px -1px 0 #808080,
    inset 1px 1px 0 #dfdfdf;
}

.quick-access__button:active {
  padding: 0.3125rem 0.1875rem 0.1875rem 0.3125rem;
  border-color: #404040 var(--border-white-color) var(--border-white-color) #404040;
  box-shadow: inset 1px 1px 0 #808080;
}

.quick-access__button:focus-visible {
  outline: 2px dotted #000;
  outline-offset: -0.375rem;
}

.quick-access__screen {
  width: 1.25rem;
  height: 1.25rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #fff;
  border: 1px solid #808080;
}

.quick-access__screen--github {
  padding: 0.125rem;
}

.quick-access__screen--linkedin {
  background: #0a66c2;
  border-color: #064e96;
}

.quick-access__screen img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

@media (max-width: 31.25rem) {
  .quick-access {
    gap: 0;
    margin-right: 0.125rem;
  }

  .quick-access__button {
    width: 1.875rem;
  }
}
</style>
