<template>
  <component :is="vNode" />
</template>

<script setup lang="ts" generic="Data">
import { Functions, InjectionKeys, Utilities } from '@vue-leaflet/vue-leaflet'
import { type HexbinLayer, type HexbinData, hexbinLayer } from 'leaflet-hexbin'

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
import type { LatLngExpression } from 'leaflet'

const { propsBinder, assertInject, WINDOW_OR_GLOBAL } = Utilities
const { render } = Functions.Layer

type HexbinEvents = {
  mouseover: [data: HexbinData<Data>[], hexbinLayer: HexbinLayer, event: MouseEvent]
  mouseout: [data: HexbinData<Data>[], hexbinLayer: HexbinLayer, event: MouseEvent]
  click: [data: HexbinData<Data>[], hexbinLayer: HexbinLayer, event: MouseEvent]
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
console.log(props)
onMounted(async () => {
  leafletObject.value = markRaw(hexbinLayer<Data>(options))
  leafletObject.value.data(props.data ?? [], props.accessor)

  watch(
    () => props.hoverHandler,
    (handler) => {
      if (leafletObject.value && handler) {
        leafletObject.value.hoverHandler(handler)
      }
    },
    { immediate: true },
  )

  // Bind events
  hexEvents.forEach((event) => {
    leafletObject
      .value!.dispatch()
      .on(event, (data: HexbinData<Data>[], layer: HexbinLayer, ev: MouseEvent) => {
        // Disgusting hack to get the correct types
        emit(event as 'mouseover', data, layer, ev)
      })
  })

  propsBinder(methods, leafletObject.value, props)

  addLayer({
    ...props,
    ...methods,
    leafletObject: leafletObject.value,
  })

  ready.value = true
  nextTick(() => context.emit('ready', leafletObject.value!))

  watchEffect(() => {
    if (ready.value && leafletObject.value) {
      leafletObject.value.data(props.data ?? [], props.accessor)
    }
  })
})

// Custom rendering delegated to leaflet
const vNode = render(ready.value, slots)
</script>
