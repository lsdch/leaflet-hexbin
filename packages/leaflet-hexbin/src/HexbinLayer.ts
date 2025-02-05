import { scaleLinear, dispatch, select, extent } from 'd3';
import { hexbin, type HexbinBin } from 'd3-hexbin';
import * as L from 'leaflet';
import HexbinHoverHandler from './HexbinHoverHandler';

// Need to expose some methods from L.SVG
declare module 'leaflet' {
  interface SVG {
    _initContainer(): void;
    _container: SVGElementTagNameMap['svg']
  }
}

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
}

/**
 * Hexbin data attached to each hexagon, once binned.
 */
export type HexbinData<Data> = {
  data: Data;
  coord: L.LatLngExpression;
  point: Readonly<[number, number]>;
}


function isLatLngExpression(d: any): d is L.LatLngExpression {
  return (
    d instanceof L.LatLng ||
    (typeof d === 'object' && "lat" in d && "lng" in d) ||
    (Array.isArray(d) && d.length === 2 && typeof d[0] === 'number' && typeof d[1] === 'number')
  )
}

/**
 * Instantiate a hexbin layer.
 * Extends L.SVG to take advantage of built-in zoom animations.
 */
export class HexbinLayer<Data = L.LatLngExpression> extends L.SVG {
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
    // Handle parent default options
    // ...L.SVG.prototype.options,
    ...L.Renderer.prototype.options,
    ...L.Layer.prototype.options
  }
  _fn = {
    lng: (d: Data) => L.latLng(this._accessor(d)).lng,
    lat: (d: Data) => L.latLng(this._accessor(d)).lat,
    colorValue: (d: HexbinData<Data>[]) => d.length,
    radiusValue: (d: HexbinData<Data>[]) => d.length,
    opacityValue: (d: HexbinData<Data>[]) => d.length,
    fill: (d: HexbinData<Data>[]) => {
      const val = this._fn.colorValue(d);
      return (null != val) ? this._scale.color(val) : 'none';
    }
  }
  // Set up the customizable scale
  _scale = {
    color: scaleLinear<string, string>(),
    radius: scaleLinear(),
    opacity: scaleLinear()
  };

  // Set up the Dispatcher for managing events and callbacks
  _dispatch = dispatch<SVGPathElement>('mouseover', 'mouseout', 'click');

  // Set up the default hover handler
  _hoverHandler: HexbinHoverHandler<Data> = HexbinHoverHandler.none();

  // Create the hex layout
  _hexLayout = hexbin<HexbinData<Data>>()
    .radius(this.options.radius)
    .x(({ point: [x, _] }) => x)
    .y(({ point: [_, y] }) => y);

  // Initialize the data array to be empty
  _data = Array<Data>()


  declare _map: L.Map;
  declare _container: SVGElementTagNameMap['svg'];

  // declare _container: HTMLElement;
  declare _d3Container: d3.Selection<SVGGElement, unknown, null, undefined>;

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

  _accessor(d: Data) {
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
    // Redraw on moveend
    map.on('moveend', this.redraw, this);
    // Initial draw
    this.redraw();
    return this
  }

  _project(latlng: L.LatLngExpression) {
    const { x, y } = this._map.latLngToLayerPoint(latlng);
    return [x, y] as const;
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
  * @private
  */
  _destroyContainer() {
    select(this._container).remove();
  }

  /**
   * (Re)draws the hexbins data on the container
   * @private
   */
  redraw() {
    const that = this;

    if (!that._map) return

    // Generate the mapped version of the data
    const data = that._data.map<HexbinData<Data>>((d: Data) => {
      const coord = that._accessor(d)
      const point = that._project(coord);
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

  _linearlySpace(from: number, to: number, length: number): number[] {
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
      const c = select<SVGGElement, HexbinBin<HexbinData<Data>>>(this).raise();
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
      thisLayer._hoverHandler.mouseover(this, thisLayer, ev, data);
      thisLayer._dispatch.call('mouseover', this, data, thisLayer, ev);
      this.classList.add('hover')
    })
      .on('mouseout', function (this: SVGPathElement, ev: MouseEvent, data) {
        thisLayer._hoverHandler.mouseout(this, thisLayer, ev, data);
        thisLayer._dispatch.call('mouseout', this, data, thisLayer, ev);
        this.classList.remove('hover')
      })
      .on('click', function (this, ev: MouseEvent, data) {
        thisLayer._dispatch.call('click', this, data, thisLayer, ev);
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

  opacity(): number | [number, number];
  opacity(v: number | [number, number]): this;
  opacity(v?: number | [number, number]): this | number | [number, number] {
    if (v === undefined) return this.options.opacity
    this.options.opacity = v;
    this._scale.opacity.range(typeof v === 'number' ? [v, v] : v).clamp(true);

    return this;
  }

  duration(): number;
  duration(v: number): this;
  duration(v?: number): this | number {
    if (v === undefined) return this.options.duration
    this.options.duration = v

    return this;
  }

  colorScaleExtent(): [number, number | undefined];
  colorScaleExtent(v: [number, number | undefined]): this;
  colorScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.colorScaleExtent; }
    this.options.colorScaleExtent = v;

    return this;
  }

  radiusScaleExtent(): [number, number | undefined];
  radiusScaleExtent(v: [number, number | undefined]): this;
  radiusScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.radiusScaleExtent; }
    this.options.radiusScaleExtent = v;

    return this;
  }

  opacityScaleExtent(): [number, number | undefined];
  opacityScaleExtent(v: [number, number | undefined]): this;
  opacityScaleExtent(v?: [number, number | undefined]): this | [number, number | undefined] {
    if (v === undefined) { return this.options.opacityScaleExtent; }
    this.options.opacityScaleExtent = v;

    return this;
  }


  colorRange(): string[];
  colorRange(v: string[]): this;
  colorRange(v?: string[]): this | string[] {
    if (v === undefined) { return this.options.colorRange; }
    this.options.colorRange = v;
    this._scale.color.range(v);

    return this;
  }

  radiusRange(): [number, number] | null;
  radiusRange(v: [number, number] | null): this;
  radiusRange(v?: [number, number] | null): this | [number, number] | null {
    if (v === undefined) { return this.options.radiusRange; }
    this.options.radiusRange = v;
    this._scale.radius.range(this.options.radiusRange ?? [this.options.radius, this.options.radius]).clamp(true);

    return this;
  }

  colorScale(): d3.ScaleLinear<string, string>;
  colorScale(v: d3.ScaleLinear<string, string>): this;
  colorScale(v?: d3.ScaleLinear<string, string>) {
    if (v === undefined) return this._scale.color;
    this._scale.color = v;
    return this;
  }

  radiusScale(): d3.ScaleLinear<number, number>;
  radiusScale(v: d3.ScaleLinear<number, number>): this;
  radiusScale(v?: d3.ScaleLinear<number, number>): this | d3.ScaleLinear<number, number> {
    if (v === undefined) return this._scale.radius
    this._scale.radius = v;
    return this;
  }

  lng(): (d: Data) => number;
  lng(v: (d: Data) => number): this;
  lng(v?: (d: Data) => number) {
    if (v === undefined) { return this._fn.lng; }
    this._fn.lng = v;

    return this;
  }

  lat(): (d: Data) => number;
  lat(v: (d: Data) => number): this;
  lat(v?: (d: Data) => number) {
    if (v === undefined) { return this._fn.lat; }
    this._fn.lat = v;

    return this;
  }

  colorValue(): (d: HexbinData<Data>[]) => number;
  colorValue(v: (d: HexbinData<Data>[]) => number): this;
  colorValue(v?: (d: HexbinData<Data>[]) => number) {
    if (v === undefined) { return this._fn.colorValue; }
    this._fn.colorValue = v;

    return this;
  }

  radiusValue(): (d: HexbinData<Data>[]) => number;
  radiusValue(v: (d: HexbinData<Data>[]) => number): this;
  radiusValue(v?: (d: HexbinData<Data>[]) => number) {
    if (v === undefined) { return this._fn.radiusValue; }
    this._fn.radiusValue = v;

    return this;
  }

  fill(): (d: HexbinData<Data>[]) => string;
  fill(v: (d: HexbinData<Data>[]) => string): this;
  fill(v?: (d: HexbinData<Data>[]) => string) {
    if (v === undefined) { return this._fn.fill; }
    this._fn.fill = v;

    return this;
  }

  // data(): Data[];
  // data(v: (Data & L.LatLngExpression)[]): this;
  // data(v: Data[], accessor?: (d: Data) => L.LatLngExpression): this;

  // data(v?: L.LatLngExpression[], accessor?: Data extends L.LatLngExpression ? undefined : (d: Data) => L.LatLngExpression): this | Data[] {
  //   if (v === undefined) { return this._data; }
  //   this._data = (null != v) ? v : [];
  //   this.redraw();

  //   return this;
  // }

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

    this.redraw();
    return this;
  }

  /*
   * Getter for the event dispatcher
   */
  dispatch() { return this._dispatch }

  hoverHandler(): HexbinHoverHandler<Data>;
  hoverHandler(v: HexbinHoverHandler<Data>): this;
  hoverHandler(v?: HexbinHoverHandler<Data>): this | HexbinHoverHandler<Data> {
    if (v === undefined) { return this._hoverHandler; }
    this._hoverHandler = (null != v) ? v : HexbinHoverHandler.none();

    this.redraw();

    return this;
  }

  /*
   * Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
   */
  getLatLngs() {
    const that = this;

    // Map the data into an array of latLngs using the configured lat/lng accessors
    return this._data.map(function (d) {
      return L.latLng(that._fn.lat(d), that._fn.lng(d));
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


