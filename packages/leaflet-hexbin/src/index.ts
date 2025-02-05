import { HexbinLayer as CHexbinLayer, type HexbinLayerConfig as IHexbinLayerConfig, hexbinLayer, type HexbinData } from './HexbinLayer'
import HexbinHoverHandler, { HexbinHoverHandler as IHexbinHoverHandler } from './HexbinHoverHandler'



// declare module 'leaflet' {
//   interface HexbinLayer extends CHexbinLayer { }
//   interface HexbinLayerConfig extends IHexbinLayerConfig { }
//   interface HexbinHoverHandler extends IHexbinHoverHandler { }
//   function hexbinLayer(config?: HexbinLayerConfig): HexbinLayer;
// }

export {
  type HexbinData,
  HexbinHoverHandler,
  CHexbinLayer as HexbinLayer,
  hexbinLayer,
  type IHexbinLayerConfig as HexbinLayerConfig
}
