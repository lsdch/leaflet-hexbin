import { HexbinHoverHandler, type HexbinLayerConfig } from "leaflet-hexbin"
// import type L from 'leaflet'
import type { ExtractPublicPropTypes, PropType, Ref, SetupContext } from 'vue'

import { Functions, Utilities } from '@vue-leaflet/vue-leaflet'
import { type HexbinLayer, type LatLngExpression, type LeafletEventHandlerFnMap } from 'leaflet'
const { propsToLeafletOptions } = Utilities
const { featureGroupProps, setupFeatureGroup } = Functions.FeatureGroup

export const hexbinLayerProps = {
  ...featureGroupProps,

  hoverHandler: {
    type: Object as PropType<HexbinHoverHandler>,
  },

  /**
   * LatLng data points to be used for the hexbin layer.
   */
  data: {
    type: Array<LatLngExpression> as PropType<Array<LatLngExpression>>,

  },
  /**
   * Hex radius in pixels.
   */
  radius: {
    type: Number,

  },
  /**
   * Opacity of the layer.
   */
  opacity: {
    type: Number,

  },
  /**
   * Duration of transition in milliseconds.
   */
  duration: {
    type: Number,

  },
  /**
   * Color scale extent.
   */
  colorScaleExtent: {
    type: Array as unknown as PropType<[number, number]>,

  },
  /**
   * Radius scale extent.
   */
  radiusScaleExtent: {
    type: Array as unknown as PropType<[number, number]>,

  },
  /**
   * Color range.
   */
  colorRange: {
    type: Array<string>,
  },
  /**
   * Radius range.
   */
  radiusRange: {
    type: Array as unknown as PropType<[number, number]>,

  }
} as const

export type LHexbinLayerProps = ExtractPublicPropTypes<typeof hexbinLayerProps>

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

export const setupHexbinLayer = <Events = unknown>(
  props: LHexbinLayerProps,
  leafletRef: Ref<HexbinLayer | undefined>,
  context: SetupContext<Events>
) => {
  const { options: featureOptions, methods: featureGroupMethods } = setupFeatureGroup(
    props,
    leafletRef,
    context
  )

  const options = propsToLeafletOptions<HexbinLayerConfig>(
    props,
    hexbinLayerProps,
    featureOptions
  )

  const methods = {
    ...featureGroupMethods,
    setRadius(radius: number) {
      console.log('set radius')
      leafletRef.value?.radius(radius).redraw()
    },
    setDuration(duration: number) {
      leafletRef.value?.duration(duration)
    },
    setOpacity(opacity: number) {
      leafletRef.value?.opacity(opacity)
    },
    setColorScaleExtent(extent: [number, number]) {
      leafletRef.value?.colorScaleExtent(extent)
    },
    setRadiusScaleExtent(extent: [number, number]) {
      leafletRef.value?.radiusScaleExtent(extent)
    },
    setColorRange(range: string[]) {
      leafletRef.value?.colorRange(range)
    },
    setRadiusRange(range: [number, number]) {
      leafletRef.value?.radiusRange(range)
    },
    setData(data: LatLngExpression[]) {
      leafletRef.value?.data(data)
    }
  }

  return { options, methods }
}
