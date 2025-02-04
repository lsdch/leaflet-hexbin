import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: "/leaflet-hexbin/",
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'leaflet-hexbin': fileURLToPath(
        new URL('../packages/leaflet-hexbin/src', import.meta.url),
      ),
      'vue-leaflet-hexbin': fileURLToPath(
        new URL('../packages/vue-leaflet-hexbin/src', import.meta.url),
      ),
    },
  },
  optimizeDeps: {
    include: ["leaflet"], // Ensure Leaflet is bundled
  },
  build: {
    // manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        globals: {
          leaflet: 'L',
          d3: "d3",
          "d3-hexbin": "d3-hexbin",
        }
      }
    },
  },
})
