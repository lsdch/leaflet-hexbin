<template>
  <div style="height: 50vh; width: 100%">
    <l-map :zoom="8" :center="[50.4, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LHexbinLayer
        :data
        :radius="12"
        @click="(d, i) => console.log('click', d, i)"
        @mouseover="(d, i) => console.log('mouseover', d, i)"
      >
      </LHexbinLayer>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import LHexbinLayer from 'vue-leaflet-hexbin'
import type { LatLngExpression } from 'leaflet'

const data = ref<LatLngExpression[]>([
  [50, 30],
  [50.6, 30.1],
  [50.7, 30.2],
  [50.1, 30.3],
])
</script>
