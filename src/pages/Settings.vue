<template>
  <section class="settings">
    <fieldset class="xp-group settings__group">
      <legend>Desktop theme</legend>
      <label v-for="option in themes" :key="option.id" class="xp-check settings__option">
        <input
          type="radio"
          name="desktop-theme"
          :value="option.id"
          :checked="theme === option.id"
          @change="setTheme(option.id)"
        />
        <span>
          <strong>{{ option.label }}</strong>
          <small>{{ option.description }}</small>
        </span>
      </label>
    </fieldset>
    <p class="settings__note">The change applies immediately and is remembered on this device.</p>
  </section>
</template>

<script setup>
import { setTheme, theme, themes } from '@/theme'
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
  padding: 16px;
  background: white;
  color: #000;
}

.settings__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 12px 12px;
}

/* Classic look; wxp's .xp-group styles the XP theme. */
:where(.classic) .settings__group {
  border: 2px groove #c0c0c0;
}

.settings__group legend {
  padding: 0 4px;
}

.settings__option {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.settings__option span {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.settings__note {
  font-size: 0.85em;
  color: #555;
}
</style>
