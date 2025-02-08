---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Leaflet hexbin"
  text: "Binned hexagon layer plugin for Leaflet"
  tagline: Aggregate geospatial data into a hexagon grid
  image:
    src: /snapshot.png
    alt: snapshot
  actions:
    - theme: brand
      text: Getting started
      link: /usage
    - theme: alt
      text: Examples
      link: /examples

features:
  - title: Interactive layer
    icon:
      light: /cursor-dark.svg
      dark: /cursor-light.svg
    details: Supports mouse events and integrates with leaflet popup and tooltips
  - title: Built with TypeScript
    icon:
      src: typescript.svg
    details: Typesafe implementation using leaflet and d3.js
  - title: VueJS component wrapper
    icon:
      src: vue.svg
    details: Easy integration in VueJS with vue-leaflet
---

::: warning
🚧 Documentation in progress 🚧

It is very incomplete for now, and is actively worked on.
:::