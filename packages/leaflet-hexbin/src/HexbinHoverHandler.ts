import * as d3 from 'd3';
import type { HexbinData } from './HexbinLayer';
import { type HexbinLayer } from './HexbinLayer';

/**
 * Interface for handling hover events on hexbins.
 */
export interface HexbinHoverHandler<Data> {
  mouseover(svg: SVGPathElement, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]): void;
  mouseout(svg: SVGPathElement, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]): void;
}

/**
 * Built-in hover handlers for hexbins.
 */
export namespace HexbinHoverHandler {
  /**
   * Resize the hexbin to fill the hexagon grid cell on hover.
   */
  export function resizeFill(): HexbinHoverHandler<any> {
    return {
      mouseover: function (svg: SVGPathElement, hexLayer: HexbinLayer<any>, event: MouseEvent, data: HexbinData<any>[]) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement);
        o.select('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', function (d) {
            return hexLayer._hexLayout.hexagon(hexLayer.options.radius);
          });
      },
      mouseout: function (svg: SVGPathElement, hexLayer: HexbinLayer<any>, event: MouseEvent, data: HexbinData<any>[]) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement);
        o.select<SVGPathElement>('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', function (d) {
            return hexLayer._hexLayout.hexagon(hexLayer.radiusScale()(hexLayer.radiusValue()(d)));
          });
      }
    };

  }

  /**
   * Resize the hexbin by a scaling factor applied to the maximum hex radius.
   * Use a scaling factor of 1 to grow/shrink the hexbin to the edge of the cell.
   */
  export function resizeScale(radiusScale: number = 1.5): HexbinHoverHandler<any> {

    // return the handler instance
    return {
      mouseover: function (svg, hexLayer, event, data) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement);
        o.select('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', function () {
            return hexLayer._hexLayout.hexagon(hexLayer.radiusScale().range()[1] * (radiusScale));
          });
      },
      mouseout: function (svg, hexLayer, event, data) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement!);
        o.select('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', (d) => {
            return hexLayer._hexLayout.hexagon(hexLayer.radiusScale()(hexLayer.radiusValue()(d)));
          });
      }
    };
  }

  /**
   * Compound multiple hover handlers into a single handler.
   */
  export function compound<Data>(handlers: HexbinHoverHandler<Data>[] = [none()]): HexbinHoverHandler<Data> {
    return {
      mouseover: function (svg, hexLayer, event, data) {
        handlers!.forEach((h) => { h.mouseover(svg, hexLayer, event, data); });
      },
      mouseout: function (svg, hexLayer, event, data) {
        handlers!.forEach((h) => { h.mouseout(svg, hexLayer, event, data); });
      }
    };
  }

  /**
   * No hover handler.
   * @deprecated Will be removed in future versions
   */
  export function none(): HexbinHoverHandler<any> {
    return {
      mouseover: function () { },
      mouseout: function () { }
    };
  }

}
export default HexbinHoverHandler
