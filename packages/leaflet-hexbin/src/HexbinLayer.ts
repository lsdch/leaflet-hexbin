import { scaleLinear, dispatch, select, extent } from 'd3';
import { hexbin, type HexbinBin } from 'd3-hexbin';
import * as L from 'leaflet';
import HexbinHoverHandler from './HexbinHoverHandler';

/**
 * @notExported
 */
L.SVG

// Need to expose some methods from L.SVG
declare module 'leaflet' {
  interface SVG {
    _initContainer(): void;
    _container: SVGElementTagNameMap['svg']
  }
}

/**
 * Tooltip definition for the hexbin layer.
 * This can be used to generate a tooltip for each hexbin, if an external tooltip was not provided using bindTooltip()
 */
export type TooltipOptions<Data> = {
  options?: L.TooltipOptions,
  content?: L.Content | ((d: HexbinData<Data>[]) => L.Content)
}

/**
 * Hexbin layer configuration options this can be provided when instantiating a new hexbin layer.
 */
export interface HexbinLayerConfig {
  /**
   * Hex grid cell radius in pixels.
   * This value should be a positive number.
   * This radius controls the radius of the hexagons used to bin the data
   * but not necessarily to draw each individual hexbin.
   * @default 12
   */
  radius?: number,
  /**
   * Sets the opacity on the hexbin layer.
   * This value should be a number between 0 and 1.
   * If an array is provided, the first element is the minimum opacity and the second is the maximum.
   * @default 0.6
   */
  opacity?: number | [number, number],
  /**
   *  Opacity scale extent: [min, max] domain for opacity interpolation.
   *  @default [1, undefined]
   */
  opacityScaleExtent?: [number, number | undefined],
  /**
   * Duration of transition in milliseconds.
   * @default 200
   */
  duration?: number,

  /**
   * Color scale extent: [min, max] domain for color interpolation.
   * @default [1, undefined]
   */
  colorScaleExtent?: [number, number | undefined],
  /**
   * This is used to override the default behavior, which is to derive the color domain from the data.
   * Normally, you can tweak the generation of the color domain using the colorScaleExtent option.
   * However, if you want to set a completely custom domain, you can provide it as an array of values with this option.
   * The array of values will be passed directly into the domain of the color scale before rendering.
   * @default null
   */
  colorDomain?: number[] | null
  /**
   * Color range used to fill the hexbins.
   * @default ['#f7fbff', '#08306b']
   */
  colorRange?: string[],

  /**
   * Radius scale extent: [min, max] domain for radius interpolation.
   * @default [1, undefined]
   */
  radiusScaleExtent?: [number, number | undefined],
  /**
   * This is used to override the default behavior, which is to derive the radius domain from the data.
   * Normally, you can tweak the generation of the radius domain using the radiusScaleExtent option.
   * However, if you want to set a completely custom domain, you can provide it as an array of values with this option.
   * The array of values will be passed directly into the domain of the radius scale before rendering.
   * @default null
   */
  radiusDomain?: number[] | null
  /**
   * Sets the range of the radius scale used to size the hexbins.
   * @default hex grid cell radius
   */
  radiusRange?: [number, number] | null,

  /**
   * You should only modify this config option if you want to change the mouse event behavior on hexbins. This will modify when the events are propagated based on the visibility state and/or part of the hexbin being hovered.
   * @default 'all'
   */
  pointerEvents?: string

  /**
   * If true, the layer will not be redrawn after data changes and hover handler binding.
   * @default false
   */
  noRedraw?: boolean
}

/**
 * Hexbin data attached to each hexagon, once binned.
 */
export type HexbinData<Data> = {
  data: Data;
  coord: L.LatLngExpression;
  point: Readonly<L.Point>;
}


function isLatLngExpression(d: any): d is L.LatLngExpression {
  return (
    d instanceof L.LatLng ||
    (typeof d === 'object' && "lat" in d && "lng" in d) ||
    (Array.isArray(d) && d.length === 2 && typeof d[0] === 'number' && typeof d[1] === 'number')
  )
}

/**
 * A layer for displaying binned data in a hexagon grid on a Leaflet map.
 * Extends L.SVG to take advantage of built-in zoom animations.
 */
export class HexbinLayer<Data = L.LatLngExpression> extends L.SVG {
  /**
   * Default options for the hexbin layer
   */
  options: Required<HexbinLayerConfig> & L.RendererOptions = {
    radius: 12,
    opacity: 0.6,
    duration: 200,

    colorScaleExtent: [1, undefined],
    radiusScaleExtent: [1, undefined],
    opacityScaleExtent: [1, undefined],
    colorDomain: null,
    radiusDomain: null,
    colorRange: ['#f7fbff', '#08306b'],
    radiusRange: null,

    pointerEvents: 'all',
    noRedraw: false,
    // Handle parent default options
    // ...L.SVG.prototype.options,
    ...L.Renderer.prototype.options,
    ...L.Layer.prototype.options
  }

  /**
   * Internal functions to access the data
   */
  protected _fn = {
    colorValue: (d: HexbinData<Data>[]) => d.length,
    radiusValue: (d: HexbinData<Data>[]) => d.length,
    opacityValue: (d: HexbinData<Data>[]) => d.length,
    fill: (d: HexbinData<Data>[]) => {
      const val = this._fn.colorValue(d);
      return (null != val) ? this._scale.color(val) : 'none';
    }
  }
  /**
   * D3 scales used for the hexbin layer
   */
  _scale = {
    color: scaleLinear<string, string>(),
    radius: scaleLinear(),
    opacity: scaleLinear()
  };

  // Set up the Dispatcher for managing events and callbacks
  protected _dispatch = dispatch<SVGPathElement>('mouseover', 'mouseout', 'click');

  // Set up the default hover handler
  protected _hoverHandler: HexbinHoverHandler<Data> = HexbinHoverHandler.none();

  // Create the hex layout
  _hexLayout = hexbin<HexbinData<Data>>()
    .radius(this.options.radius)
    .x(({ point: { x } }) => x)
    .y(({ point: { y } }) => y);

  // Initialize the data array to be empty
  protected _data = Array<Data>()


  declare protected _map: L.Map;

  protected _tooltipOptions: TooltipOptions<Data> = {};
  declare protected _tooltip: L.Tooltip | undefined;

  // declare _container: SVGElementTagNameMap['svg'];

  // declare _container: HTMLElement;
  declare protected _d3Container: d3.Selection<SVGGElement, unknown, null, undefined>;

  public constructor(options?: HexbinLayerConfig) {
    super()
    // L.SVG.prototype.initialize.call(this, options);
    this.options = { ...this.options, ...options };
    this._scale.color
      .range(this.options.colorRange)
      .clamp(true);

    this._scale.radius
      .range(this.options.radiusRange ?? [this.options.radius, this.options.radius])
      .clamp(true);

    this._scale.opacity
      .range(
        typeof this.options.opacity === 'number'
          ? [this.options.opacity, this.options.opacity]
          : this.options.opacity
      ).clamp(true);

  };

  protected _accessor(d: Data) {
    return d as L.LatLngExpression;
  }

  /**
   * Create the SVG container for the hexbins
   * @private
   */
  _initContainer() {
    super._initContainer();
    this._d3Container = select(this._container).select<SVGElementTagNameMap['g']>('g');
  }
  /**
   * Callback made by Leaflet when the layer is added to the map
   * @param map Reference to the map to which this layer has been added
   */
  onAdd(map: L.Map): this {
    // Call super.onAdd to properly initialize the SVG pane
    super.onAdd(map)

    // Store a reference to the map for later use
    this._map = map;
    this._tooltip?.setLatLng([0, 0]).addTo(map);
    // Redraw on moveend
    map.on('moveend', this.redraw, this);
    // Initial draw
    this.redraw();
    return this
  }

  /**
  * Callback made by Leaflet when the layer is removed from the map
  * @param map Reference to the map from which this layer is being removed
  */
  onRemove(map: L.Map): this {
    // Destroy the svg container
    this._destroyContainer();
    // Remove events
    map.off('moveend', this.redraw, this);
    return this
  }

  /**
  * Clean up the svg container
  */
  protected _destroyContainer() {
    select(this._container).remove();
  }

  /**
   * (Re)draws the hexbins data on the container
   */
  public redraw() {
    const that = this;

    if (!that._map) return

    // Generate the mapped version of the data
    const data = that._data.map<HexbinData<Data>>((d: Data) => {
      const coord = that._accessor(d)
      const point = that._map.latLngToLayerPoint(coord);
      return { coord: coord, point, data: d };
    });

    // Select the hex group for the current zoom level. This has
    // the effect of recreating the group if the zoom level has changed
    const join = this._d3Container.selectAll<SVGGElement, number>('g.hexbin')
      .data<number>([this._map.getZoom()], (d) => d);

    // enter
    const enter = join.enter().append('g')
      .attr('class', function (d) { return 'hexbin zoom-' + d; });

    // enter + update
    const enterUpdate = enter.merge(join);

    // exit
    join.exit().remove();

    // add the hexagons to the select
    this._createHexagons(enterUpdate, data);

  }

  protected _linearlySpace(from: number, to: number, length: number): number[] {
    const step = (to - from) / Math.max(length - 1, 1);
    return Array.from({ length }, (_, i) => from + (i * step));
  }

  _createHexagons(g: d3.Selection<SVGGElement, number, SVGGElement, unknown>, data: HexbinData<Data>[]) {
    const thisLayer = this;

    // Create the bins using the hexbin layout

    // Generate the map bounds (to be used to filter the hexes to what is visible)
    const size = thisLayer._map.getSize();
    const bounds = thisLayer._map.getBounds().pad(thisLayer.options.radius * 2 / Math.max(size.x, size.y));

    const bins = thisLayer._hexLayout(data).filter(
      ({ x, y }) => bounds.contains(thisLayer._map.layerPointToLatLng(L.point(x, y)))
    );

    // Derive the extents of the data values for each dimension
    const colorExtent = thisLayer._getExtent(bins, thisLayer._fn.colorValue, thisLayer.options.colorScaleExtent);
    const radiusExtent = thisLayer._getExtent(bins, thisLayer._fn.radiusValue, thisLayer.options.radiusScaleExtent);
    const opacityExtent = thisLayer._getExtent(bins, thisLayer._fn.opacityValue, thisLayer.options.opacityScaleExtent);

    // Match the domain cardinality to that of the color range, to allow for a polylinear scale
    const colorDomain = this.options.colorDomain
      ?? thisLayer._linearlySpace(
        colorExtent[0],
        colorExtent[1],
        thisLayer._scale.color.range().length
      );
    const radiusDomain = this.options.radiusDomain || radiusExtent;

    // Set the scale domains
    thisLayer._scale.color.domain(colorDomain);
    thisLayer._scale.radius.domain(radiusDomain);
    thisLayer._scale.opacity.domain(opacityExtent);


    /*
     * Join
     *    Join the Hexagons to the data
     *    Use a deterministic id for tracking bins based on position
     */
    const join = g.selectAll<SVGGElement, HexbinBin<HexbinData<Data>>>('g.hexbin-container')
      .data(bins, ({ x, y }) => `${x}:${y}`);


    /*
     * Update
     *    Set the fill and opacity on a transition
     *    opacity is re-applied in case the enter transition was cancelled
     *    the path is applied as well to resize the bins
     */
    join.select<SVGPathElement>('path.hexbin-hexagon')
      .transition().duration(thisLayer.options.duration)
      .attr('fill', thisLayer._fn.fill.bind(thisLayer))
      .attr('fill-opacity', (d) => thisLayer._scale.opacity(thisLayer._fn.opacityValue.call(thisLayer, d)))
      .attr('stroke-opacity', (d) => thisLayer._scale.opacity(thisLayer._fn.opacityValue.call(thisLayer, d)))
      .attr('d', (d) => {
        return thisLayer._hexLayout.hexagon(thisLayer._scale.radius(thisLayer._fn.radiusValue.call(thisLayer, d)));
      });


    /*
     * Enter
     *    Establish the path, size, fill, and the initial opacity
     *    Transition to the final opacity and size
     */
    const container = join.enter().append('g').attr('class', 'hexbin-container')
      .style('pointer-events', thisLayer.options.pointerEvents);


    container.on('mouseover', function (this: SVGGElement, d: MouseEvent, i) {
      // Bring container to foreground by re-appending it to the DOM
      select<SVGGElement, HexbinBin<HexbinData<Data>>>(this).raise();
    })

    const hexagons = container.append('path').attr('class', 'hexbin-hexagon')
      .attr('transform', ({ x, y }) => `translate(${x},${y})`)
      .attr('d', () => thisLayer._hexLayout.hexagon(thisLayer._scale.radius.range()[0]))
      // .attr('d', (data, length) => thisLayer._hexLayout.hexagon(thisLayer._scale.radius(data.length)))
      .attr('fill', thisLayer._fn.fill.bind(thisLayer))
      .attr('fill-opacity', 0.01)
      .attr('stroke-opacity', 0.01)
      .style('pointer-events', 'all');

    hexagons.transition().duration(thisLayer.options.duration)
      .attr('fill-opacity', (d) => thisLayer._scale.opacity(thisLayer._fn.opacityValue.call(thisLayer, d)))
      .attr('stroke-opacity', (d) => thisLayer._scale.opacity(thisLayer._fn.opacityValue.call(thisLayer, d)))
      .attr('d', (d) => thisLayer._hexLayout.hexagon(thisLayer._scale.radius(thisLayer._fn.radiusValue.call(thisLayer, d))))
      .style('pointer-events', 'all');

    // Grid
    const gridEnter = container.append('path').attr('class', 'hexbin-grid')
      .attr('transform', ({ x, y }) => `translate(${x},${y})`)
      .attr('d', () => thisLayer._hexLayout.hexagon(thisLayer.options.radius))
      .attr('fill', 'none')
      .attr('stroke', 'none')


    // Grid enter-update
    hexagons.on('mouseover', function (this: SVGPathElement, ev: MouseEvent, data) {
      if (thisLayer._tooltipOptions?.content) {
        thisLayer._tooltip
          ?.setContent(
            typeof thisLayer._tooltipOptions.content === "function"
              ? thisLayer._tooltipOptions.content(data)
              : thisLayer._tooltipOptions.content
          )
          .setLatLng(
            thisLayer._map.layerPointToLatLng(L.point(data.x, data.y))
          )
          .openOn(thisLayer._map);
      }
      thisLayer._hoverHandler.mouseover(this, thisLayer, ev, data);
      thisLayer._dispatch.call('mouseover', this, data, thisLayer, ev);
      this.classList.add('hover')
    })
      .on('mouseout', function (this: SVGPathElement, ev: MouseEvent, data) {
        thisLayer._tooltip?.close()
        thisLayer._hoverHandler.mouseout(this, thisLayer, ev, data);
        thisLayer._dispatch.call('mouseout', this, data, thisLayer, ev);
        this.classList.remove('hover')
      })
      .on('click', function (this, ev: MouseEvent, data) {
        const latLng = thisLayer._map.layerPointToLatLng(L.point(data.x, data.y));
        thisLayer._dispatch.call('click', this, data, latLng, thisLayer, ev);
        ev.stopPropagation()
      });


    // Exit
    const exit = join.exit();

    exit.select('path.hexbin-hexagon')
      .transition().duration(thisLayer.options.duration)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('d', (d) => thisLayer._hexLayout.hexagon(0));

    exit.transition().duration(thisLayer.options.duration).remove();

  }

  _getExtent(
    bins: HexbinBin<HexbinData<Data>>[],
    valueFn: (d: HexbinBin<HexbinData<Data>>) => number,
    scaleExtent: [number, number | undefined]
  ): [number, number] {

    // Determine the extent of the values
    let ext = extent<HexbinBin<HexbinData<Data>>, number>(bins, valueFn.bind(this));
    // If either's null, initialize them to 0
    if (ext[0] === undefined || ext[1] === undefined) {
      ext = [0, 0]
    }

    // Now apply the optional clipping of the extent
    if (undefined != scaleExtent[0]) ext[0] = scaleExtent[0];
    if (undefined != scaleExtent[1]) ext[1] = scaleExtent[1];

    return ext as [number, number]
  }

  // ------------------------------------
  // Public API
  // ------------------------------------

  /**
   * Get or set the radius of the hexagon grid cells
   */
  radius(): number;
  radius(v: number): this;
  radius(v?: number): this | number {
    if (v === undefined) return this.options.radius;

    this.options.radius = v;
    this._hexLayout.radius(v);

    if (null == this.options.radiusRange) {
      this._scale.radius.range([this.options.radius, this.options.radius]).clamp(true);
    }

    return this;
  }


  /**
   * Get or set the opacity of the hexbin layer
   * @param v The opacity value to set. If an array is provided, the first element is the minimum opacity and the second is the maximum.
   */
  opacity(): number | [number, number];
  opacity(v: number | [number, number]): this;
  opacity(v?: number | [number, number]): this | number | [number, number] {
    if (v === undefined) return this.options.opacity
    this.options.opacity = v;
    this._scale.opacity.range(typeof v === 'number' ? [v, v] : v).clamp(true);

    return this;
  }

  /**
   * Get or set the duration of transition animations
   */
  duration(): number;
  duration(v: number): this;
  duration(v?: number): this | number {
    if (v === undefined) return this.options.duration
    this.options.duration = v

    return this;
  }

  /**
   * Get or set the color scale domain extent
   * @param v The color scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of color interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.
   */
  colorScaleExtent(): [number, number | undefined];
  colorScaleExtent(v: [number, number | undefined]): this;
  colorScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.colorScaleExtent; }
    this.options.colorScaleExtent = v;

    return this;
  }

  /**
   * Get or set the radius scale domain extent
   * @param v The radius scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of radius interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.
   */
  radiusScaleExtent(): [number, number | undefined];
  radiusScaleExtent(v: [number, number | undefined]): this;
  radiusScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.radiusScaleExtent; }
    this.options.radiusScaleExtent = v;

    return this;
  }

  /**
   * Get or set the opacity scale domain extent
   * @param v The opacity scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of opacity interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.
   */
  opacityScaleExtent(): [number, number | undefined];
  opacityScaleExtent(v: [number, number | undefined]): this;
  opacityScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.opacityScaleExtent; }
    this.options.opacityScaleExtent = v;

    return this;
  }


  /**
   * Get or set the color scale range
   * @param v The color range to set. Colors will be interpolated between all provided colors.
   */
  colorRange(): string[];
  colorRange(v: string[]): this;
  colorRange(v?: string[]): this | string[] {
    if (v === undefined) { return this.options.colorRange; }
    this.options.colorRange = v;
    this._scale.color.range(v);

    return this;
  }

  /**
   * Get or set the radius scale range
   * @param v The min and max radius range to set. If null, the range will be set to the hexagon grid cell radius value.
   */
  radiusRange(): [number, number] | null;
  radiusRange(v: [number, number] | null): this;
  radiusRange(v?: [number, number] | null): this | [number, number] | null {
    if (v === undefined) { return this.options.radiusRange; }
    this.options.radiusRange = v;
    this._scale.radius.range(this.options.radiusRange ?? [this.options.radius, this.options.radius]).clamp(true);

    return this;
  }

  /**
   * Get or set the color scale domain
   */
  colorScale(): d3.ScaleLinear<string, string>;
  colorScale(v: d3.ScaleLinear<string, string>): this;
  colorScale(v?: d3.ScaleLinear<string, string>) {
    if (v === undefined) return this._scale.color;
    this._scale.color = v;
    return this;
  }

  /**
   * Get or set the radius scale domain
   */
  radiusScale(): d3.ScaleLinear<number, number>;
  radiusScale(v: d3.ScaleLinear<number, number>): this;
  radiusScale(v?: d3.ScaleLinear<number, number>): this | d3.ScaleLinear<number, number> {
    if (v === undefined) return this._scale.radius
    this._scale.radius = v;
    return this;
  }

  /**
   * Get or set the value mapper for the color scale
   * @param v The value mapper to set. This function should accept an array of hexbin data and return a number to be used for color interpolation.
   * @default the length of the data in the hexbin
   */
  colorValue(): (d: HexbinData<Data>[]) => number;
  colorValue(v: (d: HexbinData<Data>[]) => number): this;
  colorValue(v?: (d: HexbinData<Data>[]) => number) {
    if (v === undefined) { return this._fn.colorValue; }
    this._fn.colorValue = v;

    return this;
  }

  /**
   * Get or set the value mapper for the radius scale
   * @param v The value mapper to set. This function should return a number for each bin, which will be used to determine the radius of the hexagon.
   * @default the length of the data in the hexbin
   */
  radiusValue(): (d: HexbinData<Data>[]) => number;
  radiusValue(v: (d: HexbinData<Data>[]) => number): this;
  radiusValue(v?: (d: HexbinData<Data>[]) => number) {
    if (v === undefined) { return this._fn.radiusValue; }
    this._fn.radiusValue = v;

    return this;
  }

  /**
   * Get or set the value mapper for the fill color of the hexbins
   * @param v The value mapper to set. This function should return a string to be used as the fill color for the hexbin.
   * @default a color interpolated from the color scale based on the value returned by the colorValue function
   */
  fill(): (d: HexbinData<Data>[]) => string;
  fill(v: (d: HexbinData<Data>[]) => string): this;
  fill(v?: (d: HexbinData<Data>[]) => string) {
    if (v === undefined) { return this._fn.fill; }
    this._fn.fill = v;

    return this;
  }

  /**
   * Get or set the data to be binned by the hexbin layer.
   * Triggers a redraw of the hexbins when set.
   * @param v The data to set. This should be an array of data to be binned.
   * @param accessor An optional function to convert the data into a LatLngExpression. If not provided, the data is assumed to be an array of LatLngExpressions.
   */
  data(): Data[];
  data(v: Data extends L.LatLngExpression ? Data[] : never): this;
  data(v: Data[], accessor?: (d: Data) => L.LatLngExpression): this;

  // Implementation
  data(v?: Data[] | L.LatLngExpression[], accessor?: (d: Data) => L.LatLngExpression): this | Data[] {
    if (v === undefined) {
      return this._data;
    }

    if (!isLatLngExpression(v[0]) && !accessor) {
      console.error("Leaflet hexbin: data does not appear to be an array of L.LatLngExpression. You must provide an accessor function to convert the data to L.LatLngExpression");
    }

    this._data = v as Data[] ?? []
    this._accessor = accessor ?? ((d: Data) => d as L.LatLngExpression)

    if (!this.options.noRedraw) this.redraw();
    return this;
  }

  accessor(): (d: Data) => L.LatLngExpression {
    return this._accessor;
  }

  /*
   * Getter for the D3 event dispatcher
   */
  dispatch() { return this._dispatch }

  /**
   * Get or set the hover handler for the hexbin layer.
   */
  hoverHandler(): HexbinHoverHandler<Data>;
  hoverHandler(v: HexbinHoverHandler<Data>): this;
  hoverHandler(v?: HexbinHoverHandler<Data>): this | HexbinHoverHandler<Data> {
    if (v === undefined) { return this._hoverHandler; }
    this._hoverHandler = (null != v) ? v : HexbinHoverHandler.none();

    if (!this.options.noRedraw) this.redraw();

    return this;
  }

  /**
   * Get or set the tooltip content and options for the hexbin layer.
   */
  // Cannot overload bindTooltip() with data dependant content
  tooltip(tooltip: TooltipOptions<Data>): this {
    this._tooltipOptions = tooltip;
    if (this._tooltip)
      this._tooltip.options = tooltip.options ?? {};
    else {
      this._tooltip = L.tooltip(tooltip.options)
    }
    return this
  }

  /**
   * Get the tooltip instance attached to the hexbin layer
   */
  getTooltip(): L.Tooltip | undefined {
    return this._tooltip
  }

  /**
   * Bind a tooltip to the hexbin layer with the provided content and options.
   * Useful to bind an existing tooltip instance to the hexbin layer.
   */
  bindTooltip(content: L.Tooltip | L.Content, options?: L.TooltipOptions): this {
    if (content instanceof L.Tooltip) {
      this._tooltip = content;
      // FIXME: weird bug likely coming from vue-leaflet were tooltip is not properly positioned
      // this._tooltip.options.offset[0] -= 5;
      if (this._map) {
        this._tooltip.setLatLng([0, 0]).addTo(this._map)
      }
    } else {
      this._tooltip = L.tooltip(options).setContent(content);
    }
    return this
  }

  /**
   * Unbind the tooltip from the hexbin layer
   */
  unbindTooltip(): this {
    this._tooltip?.remove();
    this._tooltip = undefined;
    return this
  }

  /*
   * Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
   */
  getLatLngs() {
    // Map the data into an array of latLngs using the configured lat/lng accessors
    return this._data.map((d) => {
      return L.latLng(this._accessor(d));
    });
  }
  /*
   * Get path geometry as GeoJSON
   */
  toGeoJSON(): GeoJSON.Feature<GeoJSON.MultiPoint, L.LatLng> {
    return L.GeoJSON.getFeature<L.LatLng, GeoJSON.MultiPoint>(this, {
      type: 'MultiPoint',
      coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs(), 0)
    });
  }
}

/**
 * Factory function to instanciate a new hexbin layer
 */
export function hexbinLayer<Data = L.LatLngExpression>(options?: HexbinLayerConfig) {
  return new HexbinLayer<Data>(options);
}


