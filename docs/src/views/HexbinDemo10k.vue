<template>
  <div style="height: 50vh; width: 100%">
    <l-map :useGlobalLeaflet="true" :zoom="13" :center="[-37.9, 175.46]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LHexbinLayer
        :data
        :opacity="0.9"
        :radius-range="[2, 12]"
        :color-range="['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725']"
        @click="(d, i) => console.log('click', d, i)"
        @ready="(v) => console.log('ready')"
        :hover-handler="
          HexbinHoverHandler.compound([
            HexbinHoverHandler.resizeScale(2),
            // HexbinHoverHandler.resizeFill(),
            HexbinHoverHandler.tooltip({
              tooltipContent(d) {
                return `Count: ${d.length}`
              },
            }),
          ])
        "
      >
        <!-- @mouseover="(d, i) => console.log('mouseover', d, i)" -->
      </LHexbinLayer>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import data from '../data/points_10k'
import { LHexbinLayer, HexbinHoverHandler } from 'vue-leaflet-hexbin'
</script>

<style lang="scss">
.hexbin {
  cursor: pointer;
}
.hexbin-container {
  .hexbin-hexagon.hover {
    fill-opacity: 1;
    fill: red;
    background-color: red;
    transition: 200ms;
    z-index: 9999;
  }
}
</style>
