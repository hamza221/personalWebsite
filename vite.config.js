import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // wxp registers light-DOM custom elements (xp-window, xp-desktop, …).
          isCustomElement: (tag) => tag.startsWith('xp-'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
