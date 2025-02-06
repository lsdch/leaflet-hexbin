<template>
  <div v-if="ready">
    <slot name="popup" v-bind="selected"> </slot>
  </div>
</template>

<script setup lang="ts" generic="Data">
import { Functions, InjectionKeys, Utilities } from '@vue-leaflet/vue-leaflet'
import { HexbinHoverHandler, hexbinLayer, type HexbinData, type HexbinLayer } from 'leaflet-hexbin'

import {
  markRaw,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
  watchEffect,
  type EmitFn,
  type SetupContext,
} from 'vue'

import { hexbinLayerProps, setupHexbinLayer } from '../hexbinLayer'

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

const hexEvents = ['mouseover', 'mouseout', 'click'] as const

const leafletObject = ref<HexbinLayer<Data>>()
const ready = ref(false)

const addLayer = assertInject(InjectionKeys.AddLayerInjection)

const { methods, options } = setupHexbinLayer<Data>(props, leafletObject, context)

type HexSelection = {
  data: HexbinData<Data>[]
  layer: HexbinLayer
  event: MouseEvent
  latLng: L.LatLng
}
const selected = ref<Partial<HexSelection>>({})
const hovered = ref<Partial<HexSelection>>({})

onMounted(async () => {
  leafletObject.value = markRaw(hexbinLayer<Data>(options))
  leafletObject.value.data(props.data ?? [], props.accessor)

  watch(
    () => props.hover,
    (hover) => {
      if (!leafletObject.value) return
      const handlers = []
      if (hover?.fill) handlers.push(HexbinHoverHandler.resizeFill())
      if (hover?.scale) handlers.push(HexbinHoverHandler.resizeScale(hover.scale))
      leafletObject.value.hoverHandler(HexbinHoverHandler.compound(handlers))
    },
    { immediate: true },
  )

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

  propsBinder(methods, leafletObject.value, props)

  addLayer({
    ...props,
    ...methods,
    leafletObject: leafletObject.value,
  })

  ready.value = true
  nextTick(() => context.emit('ready', leafletObject.value!))

  // Bind data and accessor at the same time
  watchEffect(() => {
    if (ready.value && leafletObject.value) {
      leafletObject.value.data(props.data ?? [], props.accessor)
    }
  })
})
</script>
