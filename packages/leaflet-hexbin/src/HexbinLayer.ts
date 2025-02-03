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
  radius?: number,
  opacity?: number,
  duration?: number,

  colorScaleExtent?: [number, number | undefined],
  colorDomain?: number[] | null
  colorRange?: string[],

  radiusScaleExtent?: [number, number | undefined],
  radiusDomain?: number[] | null
  radiusRange?: [number, number],

  pointerEvents?: string
}

export type HexbinData = {
  o: L.LatLngExpression;
  point: Readonly<[number, number]>;
}


/**
 * L is defined by the Leaflet library, see git://github.com/Leaflet/Leaflet.git for documentation
 * We extend L.SVG to take advantage of built-in zoom animations.
 */
export class HexbinLayer extends L.SVG implements L.HexbinLayer {
  options: Required<HexbinLayerConfig> & L.RendererOptions = {
    radius: 12,
    opacity: 0.6,
    duration: 200,

    colorScaleExtent: [1, undefined],
    radiusScaleExtent: [1, undefined],
    colorDomain: null,
    radiusDomain: null,
    colorRange: ['#f7fbff', '#08306b'],
    radiusRange: [4, 12],

    pointerEvents: 'all',
    // Handle parent default options
    // ...L.SVG.prototype.options,
    ...L.Renderer.prototype.options,
    ...L.Layer.prototype.options
  }
  _fn = {
    lng: (d: L.LatLngExpression) => L.latLng(d).lng,
    lat: (d: L.LatLngExpression) => L.latLng(d).lat,
    colorValue: (d: HexbinData[]) => d.length,
    radiusValue: (d: HexbinData[]) => Number.MAX_VALUE,
    fill: (d: HexbinData[]) => {
      const val = this._fn.colorValue(d);
      return (null != val) ? this._scale.color(val) : 'none';
    }
  }
  // Set up the customizable scale
  _scale = {
    color: scaleLinear<string, string>(),
    radius: scaleLinear()
  };

  // Set up the Dispatcher for managing events and callbacks
  _dispatch = dispatch<SVGPathElement>('mouseover', 'mouseout', 'click');

  // Set up the default hover handler
  _hoverHandler: HexbinHoverHandler = HexbinHoverHandler.none();

  // Create the hex layout
  _hexLayout = hexbin<HexbinData>()
    .radius(this.options.radius)
    .x(({ point: [x, _] }) => x)
    .y(({ point: [_, y] }) => y);

  // Initialize the data array to be empty
  _data = Array<L.LatLngExpression>()

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
      .range(this.options.radiusRange)
      .clamp(true);
  };

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
    // L.SVG.prototype.onRemove.call(this, map);
    // super.onRemove(map);
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
    const data = that._data.map<HexbinData>((d) => {
      const point = that._project(d);
      return { o: d, point };
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

    // const arr = new Array(length);
    // var step = (to - from) / Math.max(length - 1, 1);

    // for (var i = 0; i < length; ++i) {
    //   arr[i] = from + (i * step);
    // }

    // return arr;
  }

  _createHexagons(g: d3.Selection<SVGGElement, number, SVGGElement, unknown>, data: HexbinData[]) {
    const that = this;

    // Create the bins using the hexbin layout

    // Generate the map bounds (to be used to filter the hexes to what is visible)
    const size = that._map.getSize();
    const bounds = that._map.getBounds().pad(that.options.radius * 2 / Math.max(size.x, size.y));

    const bins = that._hexLayout(data).filter(
      ({ x, y }) => bounds.contains(that._map.layerPointToLatLng(L.point(x, y)))
    );

    // Derive the extents of the data values for each dimension
    const colorExtent = that._getExtent(bins, that._fn.colorValue, that.options.colorScaleExtent);
    const radiusExtent = that._getExtent(bins, that._fn.radiusValue, that.options.radiusScaleExtent);

    // Match the domain cardinality to that of the color range, to allow for a polylinear scale
    const colorDomain = this.options.colorDomain
      ?? that._linearlySpace(
        colorExtent[0],
        colorExtent[1],
        that._scale.color.range().length
      );
    const radiusDomain = this.options.radiusDomain || radiusExtent;

    // Set the scale domains
    that._scale.color.domain(colorDomain);
    that._scale.radius.domain(radiusDomain);


    /*
     * Join
     *    Join the Hexagons to the data
     *    Use a deterministic id for tracking bins based on position
     */
    // bins = bins.filter(function (d) {
    //   return bounds.contains(that._map.layerPointToLatLng(L.point(d.x, d.y)));
    // });
    const join = g.selectAll<SVGGElement, HexbinBin<HexbinData>>('g.hexbin-container')
      .data(bins, ({ x, y }) => `${x}:${y}`);


    /*
     * Update
     *    Set the fill and opacity on a transition
     *    opacity is re-applied in case the enter transition was cancelled
     *    the path is applied as well to resize the bins
     */
    join.select<SVGPathElement>('path.hexbin-hexagon').transition().duration(that.options.duration)
      .attr('fill', that._fn.fill.bind(that))
      .attr('fill-opacity', that.options.opacity)
      .attr('stroke-opacity', that.options.opacity)
      .attr('d', (d) => {
        return that._hexLayout.hexagon(that._scale.radius(that._fn.radiusValue.call(that, d)));
      });


    /*
     * Enter
     *    Establish the path, size, fill, and the initial opacity
     *    Transition to the final opacity and size
     */
    const enter = join.enter().append('g').attr('class', 'hexbin-container')
      .style('pointer-events', that.options.pointerEvents);

    const hexagons = enter.append('path').attr('class', 'hexbin-hexagon')
      .attr('transform', ({ x, y }) => `translate(${x},${y})`)
      .attr('d', () => that._hexLayout.hexagon(that._scale.radius.range()[0]))
      .attr('fill', that._fn.fill.bind(that))
      .attr('fill-opacity', 0.01)
      .attr('stroke-opacity', 0.01)
      .style('pointer-events', 'all');

    hexagons.transition().duration(that.options.duration)
      .attr('fill-opacity', that.options.opacity)
      .attr('stroke-opacity', that.options.opacity)
      .attr('d', (d) => that._hexLayout.hexagon(that._scale.radius(that._fn.radiusValue.call(that, d))))
      .style('pointer-events', 'all');
    // .style('pointer-events', that.options.pointerEvents);

    // Grid
    const gridEnter = enter.append('path').attr('class', 'hexbin-grid')
      .attr('transform', ({ x, y }) => `translate(${x},${y})`)
      .attr('d', () => that._hexLayout.hexagon(that.options.radius))
      .attr('fill', 'none')
      .attr('stroke', 'none')
    // .style('pointer-events', that.options.pointerEvents);


    // Grid enter-update
    // gridEnter(join.select('path.hexbin-hexagon'))
    hexagons
      // join
      .on('mouseover', function (this: SVGPathElement, d: MouseEvent, i) {
        this.parentElement!.parentElement!.appendChild(this.parentElement!);
        that._hoverHandler.mouseover(this, that as L.HexbinLayer, d, i);
        that._dispatch.call('mouseover', this, d, i);
      })
      .on('mouseout', function (this: SVGPathElement, d: MouseEvent, i) {
        that._hoverHandler.mouseout(this, that as L.HexbinLayer, d, i);
        that._dispatch.call('mouseout', this, that as L.HexbinLayer, d, i);
      })
      .on('click', function (this, d, i) {
        that._dispatch.call('click', this, that as L.HexbinLayer, d, i);
      });


    // Exit
    const exit = join.exit();

    exit.select('path.hexbin-hexagon')
      .transition().duration(that.options.duration)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('d', (d) => that._hexLayout.hexagon(0));

    exit.transition().duration(that.options.duration).remove();

  }


  _getExtent(
    bins: HexbinBin<HexbinData>[],
    valueFn: (d: HexbinBin<HexbinData>) => number,
    scaleExtent: [number, number | undefined]
  ) {

    // Determine the extent of the values
    let ext = extent<HexbinBin<HexbinData>, number>(bins, valueFn.bind(this));
    if (ext[0] === undefined || ext[1] === undefined) {
      ext = [0, 0]
    }
    // If either's null, initialize them to 0
    // if (undefined == extent[0]) extent[0] = 0;
    // if (null == extent[1]) extent[1] = 0;

    // Now apply the optional clipping of the extent
    if (null != scaleExtent[0]) ext[0] = scaleExtent[0];
    if (null != scaleExtent[1]) ext[1] = scaleExtent[1];

    return ext
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

    return this;
  }

  opacity(): number;
  opacity(v: number): this;
  opacity(v?: number): this | number {
    if (v === undefined) return this.options.opacity
    this.options.opacity = v;

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

  colorRange(): string[];
  colorRange(v: string[]): this;
  colorRange(v?: string[]): this | string[] {
    if (v === undefined) { return this.options.colorRange; }
    this.options.colorRange = v;
    this._scale.color.range(v);

    return this;
  }

  radiusRange(): [number, number];
  radiusRange(v: [number, number]): this;
  radiusRange(v?: [number, number]): this | [number, number] {
    if (v === undefined) { return this.options.radiusRange; }
    this.options.radiusRange = v;
    this._scale.radius.range(v);

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

  lng(): (d: L.LatLngExpression) => number;
  lng(v: (d: L.LatLngExpression) => number): this;
  lng(v?: (d: L.LatLngExpression) => number) {
    if (v === undefined) { return this._fn.lng; }
    this._fn.lng = v;

    return this;
  }

  lat(): (d: L.LatLngExpression) => number;
  lat(v: (d: L.LatLngExpression) => number): this;
  lat(v?: (d: L.LatLngExpression) => number) {
    if (v === undefined) { return this._fn.lat; }
    this._fn.lat = v;

    return this;
  }

  colorValue(): (d: HexbinData[]) => number;
  colorValue(v: (d: HexbinData[]) => number): this;
  colorValue(v?: (d: HexbinData[]) => number) {
    if (v === undefined) { return this._fn.colorValue; }
    this._fn.colorValue = v;

    return this;
  }

  radiusValue(): (d: HexbinData[]) => number;
  radiusValue(v: (d: HexbinData[]) => number): this;
  radiusValue(v?: (d: HexbinData[]) => number) {
    if (v === undefined) { return this._fn.radiusValue; }
    this._fn.radiusValue = v;

    return this;
  }

  fill(): (d: HexbinData[]) => string;
  fill(v: (d: HexbinData[]) => string): this;
  fill(v?: (d: HexbinData[]) => string) {
    if (v === undefined) { return this._fn.fill; }
    this._fn.fill = v;

    return this;
  }

  data(): L.LatLngExpression[];
  data(v: L.LatLngExpression[]): this;
  data(v?: L.LatLngExpression[]): this | L.LatLngExpression[] {
    if (v === undefined) { return this._data; }
    this._data = (null != v) ? v : [];
    this.redraw();

    return this;
  }

  /*
   * Getter for the event dispatcher
   */
  dispatch() { return this._dispatch }

  hoverHandler(): HexbinHoverHandler;
  hoverHandler(v: HexbinHoverHandler): this;
  hoverHandler(v?: HexbinHoverHandler): this | HexbinHoverHandler {
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

export function hexbinLayer(options?: HexbinLayerConfig) {
  return new HexbinLayer(options);
}


