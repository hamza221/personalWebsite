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

    <div class="xp-status-bar" aria-label="Document status">
      <p class="xp-status-field">{{ links.length }} link<span v-if="links.length !== 1">s</span></p>
      <p class="xp-status-field">READ ONLY</p>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--xp-face, #ece9d8);
  color: #000;
}

.text-editor__menu {
  display: flex;
  gap: 1.25rem;
  padding: 3px 8px;
  border-bottom: 1px solid #d5d1c2;
  cursor: default;
}

.text-editor__document {
  min-height: 12rem;
  flex: 1;
  padding: 1rem;
  overflow: auto;
  background: #fff;
  border-bottom: 1px solid #aca899;
  font-family: 'Lucida Console', 'Courier New', monospace;
  font-size: 13px;
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

.xp-status-bar {
  flex: 0 0 auto;
}
</style>
