<template>
  <v-card :height="500">
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
        :color-range="
          colorPalette == 'Viridis'
            ? ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725']
            : undefined
        "
        :hover-fill="hover.fill"
        :hover-scale="hover.scale.active ? hover.scale.factor : undefined"
        :colorBinding="useScaleBinding(scaleBindings.color)"
        :radiusBinding="useScaleBinding(scaleBindings.radius)"
        :opacityBinding="useScaleBinding(scaleBindings.opacity)"
        @ready="(v) => console.log('ready')"
        @update:colorScaleExtent="(extent) => console.log('color scale extent', extent)"
      >
        <template #popup="{ data, layer, event, latLng }">
          <LPopup>
            <v-card flat theme="light">
              <p>Count: {{ data?.length }}</p>
              <p>
                Total weight :
                {{ data?.reduce((acc, { data }) => acc + (data.coords[2] ?? 0), 0).toFixed(0) }}
              </p>
              <p>
                Coords:
                <v-chip class="mx-1" size="small">{{ latLng?.lat.toFixed(4) }}</v-chip>
                <v-chip class="mx-1" size="small">{{ latLng?.lng.toFixed(4) }}</v-chip>
              </p>
            </v-card>
          </LPopup>
        </template>
        <template #tooltip="{ data, layer, event }">
          <LTooltip :options="{ direction: 'top' }">
            <p>Count: {{ data?.length }}</p>
          </LTooltip>
        </template>
      </LHexbinLayer>
    </l-map>
  </v-card>
  <div class="mt-3">
    <v-row>
      <v-col>
        <v-card title="Color scale">
          <v-card-text>
            <v-select
              v-model="colorPalette"
              label="Palette"
              variant="outlined"
              :items="['Default', 'Viridis']"
            ></v-select>
            <v-select
              label="Binding"
              :items="['Count', 'Weight']"
              item-title="name"
              item-value="value"
              variant="outlined"
              v-model="scaleBindings.color.value"
            >
              <template #append>
                <v-switch
                  v-model="scaleBindings.color.log"
                  color="primary"
                  label="Log scale"
                  hide-details
                />
              </template>
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
            <v-select
              v-if="useRadiusRange"
              label="Radius scale binding"
              :items="['Count', 'Weight']"
              variant="outlined"
              v-model="scaleBindings.radius.value"
            >
              <template #append>
                <v-switch
                  v-model="scaleBindings.radius.log"
                  color="primary"
                  label="Log scale"
                  hide-details
                />
              </template>
            </v-select>
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
    </v-row>

    <v-row class="my-0">
      <v-col cols="12" md="6">
        <v-card title="Opacity" class="mt-0">
          <template #append>
            <v-switch
              v-model="opacity.asRange"
              color="primary"
              label="Use opacity scale"
              hide-details
            />
          </template>
          <v-card-text>
            <v-select
              v-if="opacity.asRange"
              label="Scale binding"
              :items="['Count', 'Weight']"
              variant="outlined"
              item-title="name"
              item-value="value"
              v-model="scaleBindings.opacity.value"
            >
              <template #append>
                <v-switch
                  v-model="scaleBindings.opacity.log"
                  color="primary"
                  label="Log"
                  hide-details
                />
              </template>
            </v-select>
            <v-range-slider
              v-if="opacity.asRange"
              v-model="opacity.range"
              label="Range"
              :min="0"
              :max="1"
              :step="0.05"
              hide-details
            />
            <v-slider
              v-else
              v-model="opacity.value"
              label="Opacity"
              :min="0"
              :max="1"
              :step="0.05"
              thumb-label
              hide-details
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card title="On hover">
          <v-card-text>
            <v-switch
              label="Fill"
              v-model="hover.fill"
              color="primary"
              hint="Scale hexagon to fill grid cell"
              persistent-hint
            ></v-switch>
            <div class="d-flex">
              <v-switch
                label="Scale"
                v-model="hover.scale.active"
                color="primary"
                hide-details
              ></v-switch>
              <v-slider
                v-model="hover.scale.factor"
                :disabled="!hover.scale.active"
                :min="1"
                :max="2"
                step="0.1"
                thumb-label
                hide-details
              ></v-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-0">
      <v-card-text>
        <v-slider
          v-model="duration"
          label="Transition duration (ms)"
          :min="0"
          :max="2000"
          thumb-label
          hide-details
        >
        </v-slider>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { LMap, LPopup, LTileLayer, LTooltip } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import LHexbinLayer, { type ScaleBinding } from 'vue-leaflet-hexbin'
import dataPoints from '@/content/public/data/points_10k'
import type { HexbinData } from 'leaflet-hexbin'
import { extent } from 'd3'

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
const hover = ref({
  fill: true,
  scale: {
    active: false,
    factor: 1.5,
  },
})

const colorPalette = ref('Viridis')

const scaleBindingFuncs = {
  Count: (d: HexbinData<Data>[]) => d.length,
  Weight: (d: HexbinData<Data>[]) => d.reduce((acc, { data }) => acc + (data.coords[2] ?? 0), 0),
}

function asLog(f: ScaleBinding<Data>) {
  return (d: HexbinData<Data>[]) => {
    const value = f(d)
    return value > 0 ? Math.log(value) : 0
  }
}

type ScaleBindingSpec = {
  value: 'Count' | 'Weight'
  log: boolean
}

function useScaleBinding(spec: ScaleBindingSpec) {
  return spec.log ? asLog(scaleBindingFuncs[spec.value]) : scaleBindingFuncs[spec.value]
}

const scaleBindings = ref<Record<'color' | 'radius' | 'opacity', ScaleBindingSpec>>({
  color: { value: 'Count', log: false },
  radius: { value: 'Count', log: false },
  opacity: { value: 'Count', log: false },
})
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
