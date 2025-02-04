import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: true,
      insertTypesEntry: true,
      include: 'src',
      outDir: "dist/types",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'leaflet-hexbin': fileURLToPath(new URL('../leaflet-hexbin/src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vue-leaflet-hexbin',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'leaflet', '@vue-leaflet/vue-leaflet'],
      output: {
        globals: {
          vue: 'Vue',
          leaflet: 'L',
          d3: "d3",
          '@vue-leaflet/vue-leaflet': 'VueLeaflet'
        }
      }
    },
    sourcemap: true,
    // Prevent chunks
    modulePreload: false,
    cssCodeSplit: false
  }
})
