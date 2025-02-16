import type { HexbinLayer, HexbinLayerConfig } from "leaflet-hexbin"
import type { PropType, Ref, SetupContext } from 'vue'

import { Functions, Utilities } from '@vue-leaflet/vue-leaflet'
import type { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet'
import { useDebounceFn } from "@vueuse/core"
const { propsToLeafletOptions } = Utilities
const { featureGroupProps, setupFeatureGroup } = Functions.FeatureGroup


/**
 * Build fails when using ExtractPublicPropTypes so we resort to redefining prop types
 */
// export type LHexbinLayerProps<Data> = ExtractPublicPropTypes<ReturnType<typeof hexbinLayerProps<Data>>>

export type LHexbinLayerProps<Data> = {
  data: Data[]
  accessor?: (d: Data) => LatLngExpression
  radius?: number
  opacity?: number | [number, number]
  radiusRange?: [number, number]
  duration?: number
  colorScaleExtent?: [number, number],
  radiusScaleExtent?: [number, number],
  opacityScaleExtent?: [number, number],
  colorRange?: string[]
  hoverFill?: boolean
  hoverScale?: number
}



export function hexbinLayerProps<Data>() {
  return {
    ...featureGroupProps,

    /**
     * Whether to grow the hexagons to fill grid area when hovering.
     */
    hoverFill: {
      type: Boolean,
      default: false
    },

    /**
     * Scale factor for the hexagons when hovering.
     */
    hoverScale: {
      type: Number,
    },

    /**
     * LatLng data points to be used for the hexbin layer.
     */
    data: {
      type: Array as PropType<Array<Data>>,
    },
    /**
     * Accessor function for the data points if data is not LatLngExpression
     */
    accessor: {
      type: Function as PropType<(d: Data) => LatLngExpression>,
    },
    /**
     * Hex grid cell radius in pixels.
     * This radius controls the radius of the hexagons used to bin the data
     * but not necessarily to draw each individual hexbin.
     */
    radius: {
      type: Number,
      validator(value: number) {
        return value > 0
      },
    },
    /**
     * Opacity of the layer.
     */
    opacity: {
      type: [Number, Array] as PropType<number | [number, number]>,
      validator(value: number | [number, number]) {
        if (typeof value === 'number') {
          return value >= 0 && value <= 1
        } else {
          return value[0] >= 0 && value[0] <= 1 && value[1] >= 0 && value[1] <= 1
        }
      },
      default: 0.6
    },
    /**
     * Duration of transition in milliseconds.
     */
    duration: {
      type: Number,
      validator(value: number) {
        return value >= 0
      }
    },
    /**
     * Color scale extent: [min, max].
     */
    colorScaleExtent: {
      type: Array as unknown as PropType<[number, number]>,
      default: [1, undefined]
    },
    /**
     * Radius scale extent: [min, max].
     */
    radiusScaleExtent: {
      type: Array as unknown as PropType<[number, number]>,
      default: [1, undefined]
    },
    /**
     * Opacity scale extent: [min, max].
     */
    opacityScaleExtent: {
      type: Array as unknown as PropType<[number, number]>,
      default: [1, undefined]
    },
    /**
     * Sets the range of the color scale used to fill the hexbins.
     * Colors scale interpolates between all provided colors.
     */
    colorRange: {
      type: Array<string>,
      default: ['#f7fbff', '#08306b']
    },
    /**
     * Sets the range of the radius scale used to size the hexbins.
     */
    radiusRange: {
      type: Array as unknown as PropType<[number, number] | null>,
    }
  } as const
}


const featureGroupEvents = {
  click() {
    return true
  },
  dblclick() {
    return true
  }
}

export const hexbinLayerEvents = {
  ...featureGroupEvents,
  ready(_: HexbinLayer) {
    return true
  }
}

export type LHexbinLayerEvents = typeof hexbinLayerEvents & LeafletEventHandlerFnMap

export const setupHexbinLayer = <Data = LatLngExpression, Events = unknown>(
  props: LHexbinLayerProps<Data>,
  leafletRef: Ref<HexbinLayer<Data> | undefined>,
  context: SetupContext<Events>
) => {
  const { options: featureOptions, methods: featureGroupMethods } = setupFeatureGroup(
    props,
    leafletRef,
    context
  )

  const options = propsToLeafletOptions<HexbinLayerConfig>(
    props,
    hexbinLayerProps(),
    featureOptions
  )

  // Debounced redraw function to avoid redrawing on every prop change
  const debouncedRedraw = useDebounceFn(() => leafletRef.value?.redraw(), 50, { maxWait: 200 })


  const methods = {
    ...featureGroupMethods,
    bindTooltip(leafletObject: any): void {
      leafletRef.value?.bindTooltip(leafletObject)
    },
    unbindTooltip() {
      leafletRef.value?.unbindTooltip()
    },
    setRadius(radius: number) {
      leafletRef.value?.radius(radius)
      debouncedRedraw()
    },
    setDuration(duration: number) {
      leafletRef.value?.duration(duration)
      debouncedRedraw()
    },
    setOpacity(opacity: number | [number, number]) {
      leafletRef.value?.opacity(opacity)
      debouncedRedraw()
    },
    setColorScaleExtent(extent: [number, number]) {
      leafletRef.value?.colorScaleExtent(extent)
      debouncedRedraw()
    },
    setRadiusScaleExtent(extent: [number, number]) {
      leafletRef.value?.radiusScaleExtent(extent)
      debouncedRedraw()
    },
    setColorRange(range: string[]) {
      leafletRef.value?.colorRange(range)
      debouncedRedraw()
    },
    setRadiusRange(range: [number, number] | null) {
      leafletRef.value?.radiusRange(range)
      debouncedRedraw()
    },
    setData(data: Data[]) {
      leafletRef.value?.data(data, leafletRef.value.accessor())
      debouncedRedraw()
    },
    setAccessor(accessor: (d: Data) => LatLngExpression) {
      leafletRef.value?.data(leafletRef.value.data(), accessor)
      debouncedRedraw()
    }
  }

  return { options, methods }
}
