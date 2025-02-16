<template>
  <div v-if="ready">
    <slot name="popup" v-bind="selected"> </slot>
    <slot name="tooltip" v-bind="hovered"></slot>
  </div>
</template>

<script setup lang="ts" generic="Data">
import { InjectionKeys, Utilities } from '@vue-leaflet/vue-leaflet'
import type {} from 'd3'
import type {} from 'd3-hexbin'
import type { HexbinData, HexbinLayer } from 'leaflet-hexbin'
import { hexbinLayerProps, setupHexbinLayer, type LHexbinLayerProps } from '../hexbinLayer'

import {
  markRaw,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watchEffect,
  type EmitFn,
  type SetupContext,
} from 'vue'

const { propsBinder, assertInject } = Utilities
type HexbinEvents = {
  mouseover: [
    data: HexbinData<Data>[],
    // latLng: L.LatLng,
    hexbinLayer: HexbinLayer,
    event: MouseEvent,
  ]
  mouseout: [
    data: HexbinData<Data>[],
    // latLng: L.LatLng,
    hexbinLayer: HexbinLayer,
    event: MouseEvent,
  ]
  click: [data: HexbinData<Data>[], latLng: L.LatLng, hexbinLayer: HexbinLayer, event: MouseEvent]
}
type Events = {
  ready: [payload: HexbinLayer]
} & HexbinEvents

const props = defineProps(hexbinLayerProps<Data>())

const attrs = useAttrs()
const slots = useSlots()

const emit = defineEmits<Events>()
const context: SetupContext = { attrs, slots, emit: emit as EmitFn, expose: () => {} }

const leafletObject = ref<HexbinLayer<Data>>()
const ready = ref(false)

const addLayer = assertInject(InjectionKeys.AddLayerInjection)

const { methods, options } = setupHexbinLayer<Data>(
  props as unknown as LHexbinLayerProps<Data>,
  leafletObject,
  context,
)

type HexSelection = {
  data: HexbinData<Data>[]
  layer: HexbinLayer
  event: MouseEvent
  latLng: L.LatLng
}
const selected = ref<Partial<HexSelection>>({})
const hovered = ref<Partial<HexSelection>>({})

onMounted(async () => {
  const { HexbinHoverHandler, hexbinLayer } = await import('leaflet-hexbin')
  // Initialize leaflet hexbin instance
  // Automatic redraw on options change is disabled, as it is handled by the component
  leafletObject.value = markRaw(hexbinLayer<Data>({ ...options, noRedraw: true }))

  leafletObject.value.data(props.data ?? [], props.accessor)

  propsBinder(methods, leafletObject.value, props)

  // Bind hover events
  watchEffect(() => {
    if (!leafletObject.value) return
    const handlers = []
    if (props.hoverFill) handlers.push(HexbinHoverHandler.resizeFill())
    if (props.hoverScale) handlers.push(HexbinHoverHandler.resizeScale(props.hoverScale))
    leafletObject.value.hoverHandler(HexbinHoverHandler.compound(handlers)).redraw()
  })

  // Bind events
  leafletObject.value
    .dispatch()
    .on('mouseover', (data: HexbinData<Data>[], layer: HexbinLayer, ev: MouseEvent) => {
      hovered.value = { data, layer, event: ev }
      emit('mouseover', data, layer, ev)
    })

  leafletObject.value
    .dispatch()
    .on('mouseout', (data: HexbinData<Data>[], layer: HexbinLayer, ev: MouseEvent) => {
      hovered.value = {}
      emit('mouseout', data, layer, ev)
    })

  // Bind popup
  leafletObject.value
    .dispatch()
    .on(
      'click',
      (data: HexbinData<Data>[], latLng: L.LatLng, layer: HexbinLayer, ev: MouseEvent) => {
        emit('click', data, latLng, layer, ev)
        selected.value = { data, layer, event: ev, latLng }
        if (leafletObject.value?.getPopup()) leafletObject.value!.openPopup(latLng)
      },
    )

  addLayer({
    ...props,
    ...methods,
    leafletObject: leafletObject.value!,
  })

  ready.value = true
  nextTick(() => context.emit('ready', leafletObject.value!))
})
</script>
