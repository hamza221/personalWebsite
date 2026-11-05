<template>
  <section class="text-editor" aria-label="Miscellaneous links read-only text editor">
    <div class="text-editor__menu" aria-hidden="true">
      <span><u>F</u>ile</span>
      <span><u>E</u>dit</span>
      <span><u>S</u>earch</span>
      <span><u>H</u>elp</span>
    </div>

    <div
      class="text-editor__document"
      role="textbox"
      aria-label="Miscellaneous links"
      aria-multiline="true"
      aria-readonly="true"
      tabindex="0"
    >
      <p class="text-editor__heading">MISCELLANEOUS LINKS</p>
      <p class="text-editor__rule">===================</p>

      <ol>
        <li v-for="link in links" :key="link.url">
          <span>{{ link.title }}</span>
          <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
        </li>
      </ol>
    </div>

    <div class="text-editor__status" aria-label="Document status">
      <span>{{ links.length }} link<span v-if="links.length !== 1">s</span></span>
      <span>READ ONLY</span>
    </div>
  </section>
</template>

<script setup>
const links = [
  {
    title: 'Nextcloud community meetup — SFSCON',
    url: 'https://www.sfscon.it/bofs/nextcloud-community-meetup/',
  },
]
</script>

<style scoped>
.text-editor {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  background: var(--tertiary-color);
  color: #000;
  font-family: Arial, sans-serif;
}

.text-editor__menu {
  display: flex;
  gap: 1.25rem;
  padding: 0.25rem 0.5rem 0.4rem;
  font-size: 0.75rem;
  cursor: default;
}

.text-editor__document {
  min-height: 12rem;
  flex: 1;
  padding: 1rem;
  overflow: auto;
  background: #fff;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.55;
  cursor: text;
  user-select: text;
}

.text-editor__document:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -4px;
}

.text-editor__heading,
.text-editor__rule {
  margin: 0;
}

.text-editor__document ol {
  margin: 1.25rem 0 0;
  padding-left: 2rem;
}

.text-editor__document li {
  margin-bottom: 1rem;
  padding-left: 0.25rem;
}

.text-editor__document li span,
.text-editor__document li a {
  display: block;
}

.text-editor__document a {
  margin-top: 0.2rem;
  color: #0000ee;
  overflow-wrap: anywhere;
}

.text-editor__document a:visited {
  color: #551a8b;
}

.text-editor__status {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.25rem;
  padding: 0.2rem 0.4rem;
  border: 1px solid;
  border-color: #808080 #fff #fff #808080;
  font-size: 0.68rem;
}
</style>
