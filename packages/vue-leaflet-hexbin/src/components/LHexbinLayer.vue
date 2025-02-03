<template>
  <component :is="vNode" />
</template>

<script setup lang="ts">
import { Functions, InjectionKeys, Utilities } from '@vue-leaflet/vue-leaflet'
import * as L from 'leaflet'
import 'leaflet-hexbin'
import L from 'leaflet'

import {
  markRaw,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
  type EmitFn,
  type SetupContext,
} from 'vue'

import { hexbinLayerProps, setupHexbinLayer } from '../hexbinLayerHelpers'

const { propsBinder, assertInject } = Utilities
const { render } = Functions.Layer

type HexbinEvents = {
  mouseover: [d: MouseEvent, i: HexbinData[]]
  mouseout: [d: MouseEvent, i: HexbinData[]]
  click: [d: MouseEvent, i: HexbinData[]]
}
type Events = {
  ready: [payload: L.HexbinLayer]
} & HexbinEvents

const props = defineProps(hexbinLayerProps)

const attrs = useAttrs()
const slots = useSlots()

const emit = defineEmits<Events>()
const context: SetupContext = { attrs, slots, emit: emit as EmitFn, expose: () => {} }

type HexbinData = {
  /**
   * Coordinates in the format `[latitude, longitude]`
   */
  o: [number, number]
  /**
   * `[x,y]` coordinates of the hexbin
   */
  point: [number, number]
}

const hexEvents = ['mouseover', 'mouseout', 'click'] as const

const leafletObject = ref<L.HexbinLayer>()
const ready = ref(false)

const addLayer = assertInject(InjectionKeys.AddLayerInjection)

const { methods, options } = setupHexbinLayer(props, leafletObject, context)

onMounted(async () => {
  leafletObject.value = markRaw(L.hexbinLayer(options))
  leafletObject.value.data(props.data ?? [])

  watch(
    () => props.hoverHandler,
    (handler) => {
      if (leafletObject.value && handler) {
        leafletObject.value.hoverHandler(handler)
      }
    },
    { immediate: true },
  )

  hexEvents.forEach((event) => {
    leafletObject.value!.dispatch().on(event, (d: MouseEvent, i: HexbinData[]) => {
      // Disgusting hack to get the correct types
      emit(event as 'mouseover', d as MouseEvent, i as HexbinData[])
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
})

// Custom rendering delegated to leaflet
const vNode = render(ready.value, slots)
</script>
