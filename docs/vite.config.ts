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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {

    // manifest: true,
    rollupOptions: {
      external: ['leaflet', /^leaflet\/.*/, 'd3', 'd3-hexbin'],
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
