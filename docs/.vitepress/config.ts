import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import sidebarLeafletAPI from '../content/leaflet-hexbin-api/typedoc-sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaflet Hexbin",
  description: "Documentation for leaflet hexbin plugin and associated Vue component",
  base: "/leaflet-hexbin/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' }
    ],
    sidebar: [
      {
        text: "Getting started",
        items: [
          { text: "Installation and basic usage", link: "/usage" }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Showcase', link: '/examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
          { text: "Toy dataset ", target: "_blank", link: "/leaflet-hexbin/data/points_10k.ts" }
        ]
      },
      {
        text: 'Leaflet hexbin API',
        items: sidebarLeafletAPI,
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lsdch/leaflet-hexbin' }
    ]
  },
  srcDir: 'content',
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
    ssr: {
      noExternal: ['vuetify']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../', import.meta.url)),
        'leaflet-hexbin': fileURLToPath(
          new URL('../../packages/leaflet-hexbin/src', import.meta.url),
        ),
        'vue-leaflet-hexbin': fileURLToPath(
          new URL('../../packages/vue-leaflet-hexbin/src', import.meta.url),
        ),
      },
    },
    optimizeDeps: {
      include: ["leaflet"], // Ensure Leaflet is bundled
    },
    build: {
      // manifest: true,
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
  }
})
