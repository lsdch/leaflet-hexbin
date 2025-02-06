import * as d3 from 'd3';
import type { HexbinData } from './HexbinLayer';
import { type HexbinLayer } from './HexbinLayer';

export interface HexbinHoverHandler<Data> {
  mouseover(svg: SVGPathElement, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]): void;
  mouseout(svg: SVGPathElement, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]): void;
}

export namespace HexbinHoverHandler {

  interface TooltipOptions<Data> {
    tooltipContent: (d: HexbinData<Data>[], hexLayer: HexbinLayer<Data>) => string;
  }

  export function tooltip<Data>(options: TooltipOptions<Data> = { tooltipContent(d) { return `Count: ${d.length}` } }): HexbinHoverHandler<Data> {

    // Generate the tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'hexbin-tooltip')
      .style('z-index', 9999)
      .style('pointer-events', 'none')
      .style('visibility', 'hidden')
      .style('position', 'fixed');

    tooltip.append('div').attr('class', 'tooltip-content');

    // return the handler instance
    return {
      mouseover: function (svg: SVGPathElement, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]) {
        const gCoords = d3.pointer(event);

        tooltip
          .style('visibility', 'visible')
          .html(options.tooltipContent(data, hexLayer));


        const div = tooltip.node();
        if (!div) {
          console.warn("Leaflet hexbin: tooltip node not found");
          return
        }
        const h = div.clientHeight, w = div.clientWidth;

        tooltip
          .style('top', event.clientY - gCoords[1] - h - 16 + 'px')
          .style('left', event.clientX - gCoords[0] - w / 2 + 'px');

      },
      mouseout: function (svg, hexLayer: HexbinLayer<Data>, event: MouseEvent, data: HexbinData<Data>[]) {
        tooltip
          .style('visibility', 'hidden')
          .html();
      }
    };

  }

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
            return hexLayer._hexLayout.hexagon(hexLayer._scale.radius(hexLayer._fn.radiusValue.call(hexLayer, d)));
          });
      }
    };

  }

  export interface ResizeScaleOptions {
    radiusScale?: number;
    duration?: number;
  }

  export function resizeScale(radiusScale: number = 1.5): HexbinHoverHandler<any> {

    // return the handler instance
    return {
      mouseover: function (svg, hexLayer, event, data) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement);
        o.select('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', function () {
            return hexLayer._hexLayout.hexagon(hexLayer._scale.radius.range()[1] * (radiusScale));
          });
      },
      mouseout: function (svg, hexLayer, event, data) {
        const o = d3.select<HTMLElement | null, HexbinData<any>[]>(svg.parentElement!);
        o.select('path.hexbin-hexagon')
          .transition().duration(hexLayer.options.duration)
          .attr('d', (d) => {
            return hexLayer._hexLayout.hexagon(hexLayer._scale.radius(hexLayer._fn.radiusValue.call(hexLayer, d)));
          });
      }
    };
  }


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

  export function none(): HexbinHoverHandler<any> {
    return {
      mouseover: function () { },
      mouseout: function () { }
    };
  }

}
export default HexbinHoverHandler
