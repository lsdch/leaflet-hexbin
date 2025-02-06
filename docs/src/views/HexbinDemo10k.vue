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
        :accessor="({ coords }: Data) => coords"
        :radius
        :radius-range="useRadiusRange ? radiusRange : null"
        :opacity="opacity.asRange ? opacity.range : opacity.value"
        :duration
        :color-range="['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725']"
        @ready="(v) => console.log('ready')"
        @popupclose="console.log('CLOSE')"
        :hover-handler="
          HexbinHoverHandler.compound([
            // HexbinHoverHandler.resizeScale(2),
            HexbinHoverHandler.resizeFill(),
          ])
        "
      >
        <template #popup="{ data, layer, event, latLng }">
          <LPopup>
            <p>Count: {{ data?.length }}</p>
            <p>Coords: {{ latLng?.lat }}, {{ latLng?.lng }}</p>
          </LPopup>
        </template>
      </LHexbinLayer>
    </l-map>
  </div>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card title="Radius">
          <template #append>
            <v-switch
              v-model="useRadiusRange"
              color="primary"
              label="Use range scale"
              hide-details
            />
          </template>
          <v-card-text>
            <v-slider
              label="Radius"
              hint="Controls bin radius"
              persistent-hint
              v-model="radius"
              :min="5"
              :max="50"
            />
            <v-range-slider
              label="Radius range"
              hint="Scale hex radius with bin length"
              persistent-hint
              v-model="radiusRange"
              :min="1"
              :max="50"
              :disabled="!useRadiusRange"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="Opacity">
          <template #append>
            <v-switch
              v-model="opacity.asRange"
              color="primary"
              label="Use opacity scale"
              hide-details
            />
          </template>
          <v-card-text>
            <v-range-slider
              v-if="opacity.asRange"
              v-model="opacity.range"
              label="Opacity"
              :min="0"
              :max="1"
              :step="0.05"
            ></v-range-slider>
            <v-slider
              v-else
              v-model="opacity.value"
              label="Opacity"
              :min="0"
              :max="1"
              :step="0.05"
              thumb-label
            ></v-slider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider
          v-model="duration"
          label="Transition duration (ms)"
          :min="0"
          :max="2000"
          thumb-label
        >
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { LLayerGroup, LMap, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import { HexbinHoverHandler, LHexbinLayer } from 'vue-leaflet-hexbin'
import dataPoints from '../data/points_10k'

type Data = { index: number; coords: [number, number, number] }
const data = ref(
  dataPoints.map((coords, i) => ({
    index: i,
    coords,
  })),
)

const radius = ref(12)
const opacity = ref({
  value: 1,
  range: [0.5, 1] as [number, number],
  asRange: false,
})
const radiusRange = ref<[number, number]>([4, 12])
const useRadiusRange = ref(false)
const duration = ref(200)
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
