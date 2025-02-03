import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
  // plugins: [
  //   dts({
  //     include: ['src/**/*', 'types/**/*.d.ts'],
  //     outDir: 'dist/types',
  //   })
  // ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: "leaflet-hexbin",
      fileName: (format) => `index.${format}.js`,
    },
    // manifest: true,
    sourcemap: true,
    rollupOptions: {
      external: ['leaflet', 'd3', 'd3-hexbin'],
      output: {
        globals: {
          leaflet: 'L',
          d3: "d3",
          "d3-hexbin": "d3-hexbin",
        }
      }
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: 'src',
      outDir: "dist/types",
    }),
  ],
})
