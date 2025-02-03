import { HexbinLayer as CHexbinLayer, HexbinLayer, type HexbinLayerConfig as IHexbinLayerConfig, hexbinLayer } from './HexbinLayer'
import HexbinHoverHandler, { HexbinHoverHandler as IHexbinHoverHandler } from './HexbinHoverHandler'
import * as L from "leaflet"


declare module 'leaflet' {
  interface HexbinLayer extends CHexbinLayer { }
  interface HexbinLayerConfig extends IHexbinLayerConfig { }
  interface HexbinHoverHandler extends IHexbinHoverHandler { }
  function hexbinLayer(config?: HexbinLayerConfig): HexbinLayer;
}

Object.assign(L, {
  HexbinLayer: CHexbinLayer,
  HexbinHoverHandler,
  hexbinLayer
})

export { HexbinHoverHandler, CHexbinLayer as HexbinLayer, hexbinLayer, type IHexbinLayerConfig as HexbinLayerConfig }
