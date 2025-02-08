import { fileURLToPath } from 'url'
import { PluginOption } from 'vite'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaflet Hexbin",
  description: "Documentation for leaflet hexbin plugin and associated Vue component",
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
        text: 'Examples',
        items: [
          { text: 'Feature showcase', link: '/examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
          { text: "Toy dataset ", target: "_blank", link: "/points_10k.ts" }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
