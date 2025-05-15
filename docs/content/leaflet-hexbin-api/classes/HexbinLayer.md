[leaflet-hexbin](../globals.md) / HexbinLayer

# Class: HexbinLayer\<Data\>

Defined in: [HexbinLayer.ts:154](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L154)

A layer for displaying binned data in a hexagon grid on a Leaflet map.
Extends L.SVG to take advantage of built-in zoom animations.

## Extends

- `SVG`

## Type Parameters

• **Data** = `L.LatLngExpression`

## Constructors

### new HexbinLayer()

> **new HexbinLayer**\<`Data`\>(`options`?): [`HexbinLayer`](HexbinLayer.md)\<`Data`\>

Defined in: [HexbinLayer.ts:221](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L221)

#### Parameters

##### options?

[`HexbinLayerConfig`](../interfaces/HexbinLayerConfig.md)\<`Data`\>

#### Returns

[`HexbinLayer`](HexbinLayer.md)\<`Data`\>

#### Overrides

`L.SVG.constructor`

## Properties

### options

> **options**: `Required`\<[`HexbinLayerConfig`](../interfaces/HexbinLayerConfig.md)\<`Data`\>\> & `RendererOptions`

Defined in: [HexbinLayer.ts:158](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L158)

Default options for the hexbin layer

#### Overrides

`L.SVG.options`

***

### \_scale

> **\_scale**: `object`

Defined in: [HexbinLayer.ts:189](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L189)

D3 scales used for the hexbin layer

#### color

> **color**: `ScaleLinear`\<`string`, `string`\>

#### radius

> **radius**: `ScaleLinear`\<`number`, `number`\>

#### opacity

> **opacity**: `ScaleLinear`\<`number`, `number`\>

***

### \_hexLayout

> **\_hexLayout**: `Hexbin`\<[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>\>

Defined in: [HexbinLayer.ts:202](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L202)

***

### \_container

> **\_container**: `SVGSVGElement`

Defined in: [HexbinLayer.ts:15](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L15)

#### Inherited from

`L.SVG._container`

***

### \_dispatch

> `protected` **\_dispatch**: `Dispatch`\<`SVGPathElement`\>

Defined in: [HexbinLayer.ts:196](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L196)

***

### \_hoverHandler

> `protected` **\_hoverHandler**: [`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

Defined in: [HexbinLayer.ts:199](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L199)

***

### \_data

> `protected` **\_data**: `Data`[]

Defined in: [HexbinLayer.ts:208](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L208)

***

### \_map

> `protected` **\_map**: `Map`

Defined in: [HexbinLayer.ts:211](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L211)

#### Overrides

`L.SVG._map`

***

### \_tooltipOptions

> `protected` **\_tooltipOptions**: [`TooltipOptions`](../type-aliases/TooltipOptions.md)\<`Data`\> = `{}`

Defined in: [HexbinLayer.ts:213](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L213)

***

### \_tooltip

> `protected` **\_tooltip**: `undefined` \| `Tooltip`

Defined in: [HexbinLayer.ts:214](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L214)

***

### \_d3Container

> `protected` **\_d3Container**: `Selection`\<`SVGGElement`, `unknown`, `null`, `undefined`\>

Defined in: [HexbinLayer.ts:219](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L219)

## Methods

### onAdd()

> **onAdd**(`map`): `this`

Defined in: [HexbinLayer.ts:258](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L258)

Callback made by Leaflet when the layer is added to the map

#### Parameters

##### map

`Map`

Reference to the map to which this layer has been added

#### Returns

`this`

#### Overrides

`L.SVG.onAdd`

***

### onRemove()

> **onRemove**(`map`): `this`

Defined in: [HexbinLayer.ts:276](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L276)

Callback made by Leaflet when the layer is removed from the map

#### Parameters

##### map

`Map`

Reference to the map from which this layer is being removed

#### Returns

`this`

#### Overrides

`L.SVG.onRemove`

***

### redraw()

> **redraw**(): `void`

Defined in: [HexbinLayer.ts:294](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L294)

(Re)draws the hexbins data on the container

#### Returns

`void`

***

### \_createHexagons()

> **\_createHexagons**(`g`, `data`): `void`

Defined in: [HexbinLayer.ts:331](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L331)

#### Parameters

##### g

`Selection`\<`SVGGElement`, `number`, `SVGGElement`, `unknown`\>

##### data

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

#### Returns

`void`

***

### \_getExtent()

> **\_getExtent**(`bins`, `valueFn`, `scaleExtent`): \[`number`, `number`\]

Defined in: [HexbinLayer.ts:470](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L470)

#### Parameters

##### bins

`HexbinBin`\<[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>\>[]

##### valueFn

(`d`) => `number`

##### scaleExtent

\[`number`, `undefined` \| `number`\]

#### Returns

\[`number`, `number`\]

***

### radius()

#### Call Signature

> **radius**(): `number`

Defined in: [HexbinLayer.ts:497](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L497)

Get or set the radius of the hexagon grid cells

##### Returns

`number`

#### Call Signature

> **radius**(`v`): `this`

Defined in: [HexbinLayer.ts:498](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L498)

Get or set the radius of the hexagon grid cells

##### Parameters

###### v

`number`

##### Returns

`this`

***

### opacity()

#### Call Signature

> **opacity**(): `number` \| \[`number`, `number`\]

Defined in: [HexbinLayer.ts:517](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L517)

Get or set the opacity of the hexbin layer

##### Returns

`number` \| \[`number`, `number`\]

#### Call Signature

> **opacity**(`v`): `this`

Defined in: [HexbinLayer.ts:518](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L518)

Get or set the opacity of the hexbin layer

##### Parameters

###### v

The opacity value to set. If an array is provided, the first element is the minimum opacity and the second is the maximum.

`number` | \[`number`, `number`\]

##### Returns

`this`

***

### duration()

#### Call Signature

> **duration**(): `number`

Defined in: [HexbinLayer.ts:530](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L530)

Get or set the duration of transition animations

##### Returns

`number`

#### Call Signature

> **duration**(`v`): `this`

Defined in: [HexbinLayer.ts:531](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L531)

Get or set the duration of transition animations

##### Parameters

###### v

`number`

##### Returns

`this`

***

### colorScaleExtent()

#### Call Signature

> **colorScaleExtent**(): \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:543](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L543)

Get or set the color scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **colorScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:544](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L544)

Get or set the color scale domain extent

##### Parameters

###### v

\[`number`, `undefined` \| `number`\]

The color scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of color interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.

##### Returns

`this`

***

### radiusScaleExtent()

#### Call Signature

> **radiusScaleExtent**(): \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:556](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L556)

Get or set the radius scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **radiusScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:557](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L557)

Get or set the radius scale domain extent

##### Parameters

###### v

\[`number`, `undefined` \| `number`\]

The radius scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of radius interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.

##### Returns

`this`

***

### opacityScaleExtent()

#### Call Signature

> **opacityScaleExtent**(): \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:569](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L569)

Get or set the opacity scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **opacityScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:570](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L570)

Get or set the opacity scale domain extent

##### Parameters

###### v

\[`number`, `undefined` \| `number`\]

The opacity scale extent to set. If an array is provided, the first element is the minimum extent and the second is the maximum. This means that for the purpose of opacity interpolation, the domain will be clipped to this extent, i.e. values below the minimum will be treated as the minimum, and values above the maximum will be treated as the maximum.

##### Returns

`this`

***

### colorRange()

#### Call Signature

> **colorRange**(): `string`[]

Defined in: [HexbinLayer.ts:583](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L583)

Get or set the color scale range

##### Returns

`string`[]

#### Call Signature

> **colorRange**(`v`): `this`

Defined in: [HexbinLayer.ts:584](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L584)

Get or set the color scale range

##### Parameters

###### v

`string`[]

The color range to set. Colors will be interpolated between all provided colors.

##### Returns

`this`

***

### radiusRange()

#### Call Signature

> **radiusRange**(): `null` \| \[`number`, `number`\]

Defined in: [HexbinLayer.ts:597](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L597)

Get or set the radius scale range

##### Returns

`null` \| \[`number`, `number`\]

#### Call Signature

> **radiusRange**(`v`): `this`

Defined in: [HexbinLayer.ts:598](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L598)

Get or set the radius scale range

##### Parameters

###### v

The min and max radius range to set. If null, the range will be set to the hexagon grid cell radius value.

`null` | \[`number`, `number`\]

##### Returns

`this`

***

### colorScale()

#### Call Signature

> **colorScale**(): `ScaleLinear`\<`string`, `string`\>

Defined in: [HexbinLayer.ts:610](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L610)

Get or set the color scale domain

##### Returns

`ScaleLinear`\<`string`, `string`\>

#### Call Signature

> **colorScale**(`v`): `this`

Defined in: [HexbinLayer.ts:611](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L611)

Get or set the color scale domain

##### Parameters

###### v

`ScaleLinear`\<`string`, `string`\>

##### Returns

`this`

***

### radiusScale()

#### Call Signature

> **radiusScale**(): `ScaleLinear`\<`number`, `number`\>

Defined in: [HexbinLayer.ts:621](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L621)

Get or set the radius scale domain

##### Returns

`ScaleLinear`\<`number`, `number`\>

#### Call Signature

> **radiusScale**(`v`): `this`

Defined in: [HexbinLayer.ts:622](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L622)

Get or set the radius scale domain

##### Parameters

###### v

`ScaleLinear`\<`number`, `number`\>

##### Returns

`this`

***

### colorValue()

#### Call Signature

> **colorValue**(): [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:634](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L634)

Get or set the value mapper for the color scale

##### Returns

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

##### Default

```ts
the length of the data in the hexbin
```

#### Call Signature

> **colorValue**(`v`): `this`

Defined in: [HexbinLayer.ts:635](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L635)

Get or set the value mapper for the color scale

##### Parameters

###### v

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

The value mapper to set. This function should accept an array of hexbin data and return a number to be used for color interpolation.

##### Returns

`this`

##### Default

```ts
the length of the data in the hexbin
```

***

### radiusValue()

#### Call Signature

> **radiusValue**(): [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:648](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L648)

Get or set the value mapper for the radius scale

##### Returns

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

##### Default

```ts
the length of the data in the hexbin
```

#### Call Signature

> **radiusValue**(`v`): `this`

Defined in: [HexbinLayer.ts:649](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L649)

Get or set the value mapper for the radius scale

##### Parameters

###### v

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

The value mapper to set. This function should return a number for each bin, which will be used to determine the radius of the hexagon.

##### Returns

`this`

##### Default

```ts
the length of the data in the hexbin
```

***

### fill()

#### Call Signature

> **fill**(): (`d`) => `string`

Defined in: [HexbinLayer.ts:662](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L662)

Get or set the value mapper for the fill color of the hexbins

##### Returns

`Function`

###### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

###### Returns

`string`

##### Default

```ts
a color interpolated from the color scale based on the value returned by the colorValue function
```

#### Call Signature

> **fill**(`v`): `this`

Defined in: [HexbinLayer.ts:663](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L663)

Get or set the value mapper for the fill color of the hexbins

##### Parameters

###### v

(`d`) => `string`

The value mapper to set. This function should return a string to be used as the fill color for the hexbin.

##### Returns

`this`

##### Default

```ts
a color interpolated from the color scale based on the value returned by the colorValue function
```

***

### data()

#### Call Signature

> **data**(): `Data`[]

Defined in: [HexbinLayer.ts:677](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L677)

Get or set the data to be binned by the hexbin layer.
Triggers a redraw of the hexbins when set.

##### Returns

`Data`[]

#### Call Signature

> **data**(`v`): `this`

Defined in: [HexbinLayer.ts:678](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L678)

Get or set the data to be binned by the hexbin layer.
Triggers a redraw of the hexbins when set.

##### Parameters

###### v

`Data` *extends* `LatLngExpression` ? `Data`\<`Data`\>[] : `never`

The data to set. This should be an array of data to be binned.

##### Returns

`this`

#### Call Signature

> **data**(`v`, `accessor`?): `this`

Defined in: [HexbinLayer.ts:679](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L679)

Get or set the data to be binned by the hexbin layer.
Triggers a redraw of the hexbins when set.

##### Parameters

###### v

`Data`[]

The data to set. This should be an array of data to be binned.

###### accessor?

(`d`) => `LatLngExpression`

An optional function to convert the data into a LatLngExpression. If not provided, the data is assumed to be an array of LatLngExpressions.

##### Returns

`this`

***

### accessor()

> **accessor**(): (`d`) => `LatLngExpression`

Defined in: [HexbinLayer.ts:698](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L698)

#### Returns

`Function`

##### Parameters

###### d

`Data`

##### Returns

`LatLngExpression`

***

### dispatch()

> **dispatch**(): `Dispatch`\<`SVGPathElement`\>

Defined in: [HexbinLayer.ts:705](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L705)

#### Returns

`Dispatch`\<`SVGPathElement`\>

***

### hoverHandler()

#### Call Signature

> **hoverHandler**(): [`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

Defined in: [HexbinLayer.ts:710](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L710)

Get or set the hover handler for the hexbin layer.

##### Returns

[`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

#### Call Signature

> **hoverHandler**(`v`): `this`

Defined in: [HexbinLayer.ts:711](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L711)

Get or set the hover handler for the hexbin layer.

##### Parameters

###### v

[`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

##### Returns

`this`

***

### colorBinding()

#### Call Signature

> **colorBinding**(): [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:725](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L725)

Get or set the color scale binding function for the hexbin layer.
This function is used to determine the color of each hexbin based on the data.

##### Returns

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

#### Call Signature

> **colorBinding**(`v`): `this`

Defined in: [HexbinLayer.ts:726](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L726)

Get or set the color scale binding function for the hexbin layer.
This function is used to determine the color of each hexbin based on the data.

##### Parameters

###### v

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

##### Returns

`this`

***

### radiusBinding()

#### Call Signature

> **radiusBinding**(): [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:738](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L738)

Get or set the radius scale binding function for the hexbin layer.
This function is used to determine the radius of each hexbin based on the data.

##### Returns

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

#### Call Signature

> **radiusBinding**(`v`): `this`

Defined in: [HexbinLayer.ts:739](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L739)

Get or set the radius scale binding function for the hexbin layer.
This function is used to determine the radius of each hexbin based on the data.

##### Parameters

###### v

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

##### Returns

`this`

***

### opacityBinding()

#### Call Signature

> **opacityBinding**(): [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:751](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L751)

Get or set the opacity scale binding function for the hexbin layer.
This function is used to determine the opacity of each hexbin based on the data.

##### Returns

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

#### Call Signature

> **opacityBinding**(`v`): `this`

Defined in: [HexbinLayer.ts:752](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L752)

Get or set the opacity scale binding function for the hexbin layer.
This function is used to determine the opacity of each hexbin based on the data.

##### Parameters

###### v

[`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

##### Returns

`this`

***

### fillBinding()

#### Call Signature

> **fillBinding**(): (`d`) => `string`

Defined in: [HexbinLayer.ts:764](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L764)

Get or set the fill binding function for the hexbin layer.
This function is used to determine the fill color of each hexbin based on the data.

##### Returns

`Function`

###### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

###### Returns

`string`

#### Call Signature

> **fillBinding**(`v`): `this`

Defined in: [HexbinLayer.ts:765](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L765)

Get or set the fill binding function for the hexbin layer.
This function is used to determine the fill color of each hexbin based on the data.

##### Parameters

###### v

(`d`) => `string`

##### Returns

`this`

***

### tooltip()

> **tooltip**(`tooltip`): `this`

Defined in: [HexbinLayer.ts:779](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L779)

Get or set the tooltip content and options for the hexbin layer.

#### Parameters

##### tooltip

[`TooltipOptions`](../type-aliases/TooltipOptions.md)\<`Data`\>

#### Returns

`this`

***

### getTooltip()

> **getTooltip**(): `undefined` \| `Tooltip`

Defined in: [HexbinLayer.ts:792](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L792)

Get the tooltip instance attached to the hexbin layer

#### Returns

`undefined` \| `Tooltip`

#### Overrides

`L.SVG.getTooltip`

***

### bindTooltip()

> **bindTooltip**(`content`, `options`?): `this`

Defined in: [HexbinLayer.ts:800](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L800)

Bind a tooltip to the hexbin layer with the provided content and options.
Useful to bind an existing tooltip instance to the hexbin layer.

#### Parameters

##### content

`Content` | `Tooltip`

##### options?

`TooltipOptions`

#### Returns

`this`

#### Overrides

`L.SVG.bindTooltip`

***

### unbindTooltip()

> **unbindTooltip**(): `this`

Defined in: [HexbinLayer.ts:817](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L817)

Unbind the tooltip from the hexbin layer

#### Returns

`this`

#### Overrides

`L.SVG.unbindTooltip`

***

### getLatLngs()

> **getLatLngs**(): `LatLng`[]

Defined in: [HexbinLayer.ts:826](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L826)

#### Returns

`LatLng`[]

***

### toGeoJSON()

> **toGeoJSON**(): `Feature`\<`MultiPoint`, `LatLng`\>

Defined in: [HexbinLayer.ts:835](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L835)

#### Returns

`Feature`\<`MultiPoint`, `LatLng`\>

***

### \_accessor()

> `protected` **\_accessor**(`d`): `LatLngExpression`

Defined in: [HexbinLayer.ts:242](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L242)

#### Parameters

##### d

`Data`

#### Returns

`LatLngExpression`

***

### \_destroyContainer()

> `protected` **\_destroyContainer**(): `void`

Defined in: [HexbinLayer.ts:287](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L287)

Clean up the svg container

#### Returns

`void`

***

### \_linearlySpace()

> `protected` **\_linearlySpace**(`from`, `to`, `length`): `number`[]

Defined in: [HexbinLayer.ts:326](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L326)

#### Parameters

##### from

`number`

##### to

`number`

##### length

`number`

#### Returns

`number`[]
