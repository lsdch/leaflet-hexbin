![alt text](/docs/assets/image.png)


# leaflet-hexbin

> 🚧 Docs in progress 🚧

> [Live demo](https://lsdch.github.io/leaflet-hexbin/)

Vizualise data using hexagonal binning in Leaflet.
This monorepo includes:
 - `leaflet-hexbin` plugin package
 - `vue-leaflet-hexbin` component to use with [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet)

This implementation was largely inspired by:
 - [@asymmetrik/leaflet-d3](https://github.com/bluehalo/leaflet-d3) for integration of d3.js hexbins
 - [veitbjarsch/vue-leaflet-markercluster](https://github.com/veitbjarsch/vue-leaflet-markercluster) for Vue component implementation and usage examples



## Features

- Create hexagonal binned layers on Leaflet maps
- Customizable colors and radius scales
- Smooth transitions and animations
- Interactive hover effects with tooltips

## Installation

```sh
pnpm add leaflet-hexbin
```

For Vue.js integration:

```sh
pnpm add vue-leaflet-hexbin
```

## Basic Usage

```ts
import * as L from "leaflet"
import 'leaflet-hexbin';

// Create map as usual using leaflet
const map = L.map('map')

// Create a hexbin layer
const hexLayer = L.hexbinLayer({
  radius: 12,
  opacity: 0.6,
  duration: 200
});

// Add data points
hexLayer.data([[lat1, lng1], [lat2, lng2], ...]);

// Add to map
hexLayer.addTo(map);
```