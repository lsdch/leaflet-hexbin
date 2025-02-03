import { HexbinLayer as CHexbinLayer, HexbinLayer, type HexbinLayerConfig as IHexbinLayerConfig, hexbinLayer } from './HexbinLayer'
import HexbinHoverHandler, { HexbinHoverHandler as IHexbinHoverHandler } from './HexbinHoverHandler'

import * as L from "leaflet"


declare module 'leaflet' {
  interface HexbinLayer extends CHexbinLayer { }
  interface HexbinLayerConfig extends IHexbinLayerConfig { }
  interface HexbinHoverHandler extends IHexbinHoverHandler { }
  function hexbinLayer(config?: HexbinLayerConfig): HexbinLayer;
}

(L as any).HexbinLayer = CHexbinLayer;
(L as any).HexbinHoverHandler = HexbinHoverHandler;
(L as any).hexbinLayer = hexbinLayer


export {
  HexbinHoverHandler,
  CHexbinLayer as HexbinLayer,
  hexbinLayer,
  type IHexbinLayerConfig as HexbinLayerConfig
}
