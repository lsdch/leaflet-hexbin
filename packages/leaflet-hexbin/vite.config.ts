
import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
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
