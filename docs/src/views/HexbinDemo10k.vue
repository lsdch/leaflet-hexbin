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
        :radius-range
        :radius
        :opacity
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
  <v-container fluid>
    <v-row>
      <v-col>
        <v-slider
          label="Radius"
          hint="Controls hex grid cell radius"
          persistent-hint
          v-model="radius"
          :min="5"
          :max="50"
        ></v-slider>
      </v-col>
      <v-col>
        <v-range-slider
          label="Radius range"
          hint="Controls hex scale radius range"
          persistent-hint
          v-model="radiusRange"
          :min="1"
          :max="50"
        >
        </v-range-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider
          v-model="opacity"
          label="Opacity"
          hint="Hex opacity"
          persistent-hint
          :min="0"
          :max="1"
          :step="0.05"
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import data from '../data/points_10k'
import { LHexbinLayer, HexbinHoverHandler } from 'vue-leaflet-hexbin'
import { ref } from 'vue'

const radius = ref(12)
const opacity = ref(1)
const radiusRange = ref<[number, number]>([4, 12])
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
