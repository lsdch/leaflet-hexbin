# Getting started

## Leaflet hexbin plugin

::: code-group
```sh [pnpm]
pnpm add leaflet-hexbin
```
```sh [yarn]
yarn add leaflet-hexbin
```
```sh [npm]
npm install leaflet-hexbin
```
:::

### Basic usage

::: code-group

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leaflet hexbin</title>
  </head>
  <body>
    <!-- Map container -->
    <div id="map"></div>
    <!-- Map script -->
    <script type="module" src="map.ts"></script>
  </body>
</html>
```
```ts [map.ts]
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import { hexbinLayer } from 'leaflet-hexbin';

// Example dataset with 10,000 geospatial coordinates
import data from "../src/data/points_10k.ts"

// Create map as usual using leaflet
const map = L.map('map')

// Create a hexbin layer
const hexLayer = hexbinLayer({
  radius: 12,
  opacity: 0.6,
  duration: 200
});

// Add data points
hexLayer.data(data);

// Add to map
hexLayer.addTo(map);
```
:::

## Vue leaflet hexbin component

::: code-group
```sh [pnpm]
pnpm add vue-leaflet-hexbin
```
```sh [yarn]
yarn add vue-leaflet-hexbin
```
```sh [npm]
npm install vue-leaflet-hexbin
```
:::

### Basic usage

```vue
<template>
<LMap>
    <LHexbinLayer :data />
</LMap>
</template>
<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap } from "@vue-leaflet/vue-leaflet"
import LHexbinLayer from "vue-leaflet-hexbin"
// Example dataset with 10,000 geospatial coordinates
import data from "../src/data/points_10k.ts"
</script>
```