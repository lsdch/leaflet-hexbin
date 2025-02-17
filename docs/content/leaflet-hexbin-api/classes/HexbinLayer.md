[leaflet-hexbin](../globals.md) / HexbinLayer

# Class: HexbinLayer\<Data\>

Defined in: [HexbinLayer.ts:147](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L147)

A layer for displaying binned data in a hexagon grid on a Leaflet map.
Extends L.SVG to take advantage of built-in zoom animations.

## Extends

- `SVG`

## Type Parameters

• **Data** = `L.LatLngExpression`

## Constructors

### new HexbinLayer()

> **new HexbinLayer**\<`Data`\>(`options`?): [`HexbinLayer`](HexbinLayer.md)\<`Data`\>

Defined in: [HexbinLayer.ts:219](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L219)

#### Parameters

##### options?

[`HexbinLayerConfig`](../interfaces/HexbinLayerConfig.md)

#### Returns

[`HexbinLayer`](HexbinLayer.md)\<`Data`\>

#### Overrides

`L.SVG.constructor`

## Properties

### options

> **options**: `Required`\<[`HexbinLayerConfig`](../interfaces/HexbinLayerConfig.md)\> & `RendererOptions`

Defined in: [HexbinLayer.ts:151](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L151)

Default options for the hexbin layer

#### Overrides

`L.SVG.options`

***

### \_scale

> **\_scale**: `object`

Defined in: [HexbinLayer.ts:187](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L187)

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

Defined in: [HexbinLayer.ts:200](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L200)

***

### \_container

> **\_container**: `SVGSVGElement`

Defined in: [HexbinLayer.ts:15](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L15)

#### Inherited from

`L.SVG._container`

***

### \_fn

> `protected` **\_fn**: `object`

Defined in: [HexbinLayer.ts:175](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L175)

Internal functions to access the data

#### colorValue()

> **colorValue**: (`d`) => `number`

##### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

##### Returns

`number`

#### radiusValue()

> **radiusValue**: (`d`) => `number`

##### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

##### Returns

`number`

#### opacityValue()

> **opacityValue**: (`d`) => `number`

##### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

##### Returns

`number`

#### fill()

> **fill**: (`d`) => `string`

##### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

##### Returns

`string`

***

### \_dispatch

> `protected` **\_dispatch**: `Dispatch`\<`SVGPathElement`\>

Defined in: [HexbinLayer.ts:194](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L194)

***

### \_hoverHandler

> `protected` **\_hoverHandler**: [`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

Defined in: [HexbinLayer.ts:197](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L197)

***

### \_data

> `protected` **\_data**: `Data`[]

Defined in: [HexbinLayer.ts:206](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L206)

***

### \_map

> `protected` **\_map**: `Map`

Defined in: [HexbinLayer.ts:209](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L209)

#### Overrides

`L.SVG._map`

***

### \_tooltipOptions

> `protected` **\_tooltipOptions**: [`TooltipOptions`](../type-aliases/TooltipOptions.md)\<`Data`\> = `{}`

Defined in: [HexbinLayer.ts:211](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L211)

***

### \_tooltip

> `protected` **\_tooltip**: `undefined` \| `Tooltip`

Defined in: [HexbinLayer.ts:212](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L212)

***

### \_d3Container

> `protected` **\_d3Container**: `Selection`\<`SVGGElement`, `unknown`, `null`, `undefined`\>

Defined in: [HexbinLayer.ts:217](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L217)

## Methods

### onAdd()

> **onAdd**(`map`): `this`

Defined in: [HexbinLayer.ts:256](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L256)

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

Defined in: [HexbinLayer.ts:274](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L274)

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

Defined in: [HexbinLayer.ts:292](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L292)

(Re)draws the hexbins data on the container

#### Returns

`void`

***

### \_createHexagons()

> **\_createHexagons**(`g`, `data`): `void`

Defined in: [HexbinLayer.ts:329](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L329)

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

Defined in: [HexbinLayer.ts:468](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L468)

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

Defined in: [HexbinLayer.ts:495](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L495)

Get or set the radius of the hexagon grid cells

##### Returns

`number`

#### Call Signature

> **radius**(`v`): `this`

Defined in: [HexbinLayer.ts:496](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L496)

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

Defined in: [HexbinLayer.ts:515](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L515)

Get or set the opacity of the hexbin layer

##### Returns

`number` \| \[`number`, `number`\]

#### Call Signature

> **opacity**(`v`): `this`

Defined in: [HexbinLayer.ts:516](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L516)

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

Defined in: [HexbinLayer.ts:528](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L528)

Get or set the duration of transition animations

##### Returns

`number`

#### Call Signature

> **duration**(`v`): `this`

Defined in: [HexbinLayer.ts:529](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L529)

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

Defined in: [HexbinLayer.ts:541](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L541)

Get or set the color scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **colorScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:542](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L542)

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

Defined in: [HexbinLayer.ts:554](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L554)

Get or set the radius scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **radiusScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:555](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L555)

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

Defined in: [HexbinLayer.ts:567](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L567)

Get or set the opacity scale domain extent

##### Returns

\[`number`, `undefined` \| `number`\]

#### Call Signature

> **opacityScaleExtent**(`v`): `this`

Defined in: [HexbinLayer.ts:568](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L568)

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

Defined in: [HexbinLayer.ts:581](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L581)

Get or set the color scale range

##### Returns

`string`[]

#### Call Signature

> **colorRange**(`v`): `this`

Defined in: [HexbinLayer.ts:582](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L582)

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

Defined in: [HexbinLayer.ts:595](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L595)

Get or set the radius scale range

##### Returns

`null` \| \[`number`, `number`\]

#### Call Signature

> **radiusRange**(`v`): `this`

Defined in: [HexbinLayer.ts:596](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L596)

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

Defined in: [HexbinLayer.ts:608](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L608)

Get or set the color scale domain

##### Returns

`ScaleLinear`\<`string`, `string`\>

#### Call Signature

> **colorScale**(`v`): `this`

Defined in: [HexbinLayer.ts:609](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L609)

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

Defined in: [HexbinLayer.ts:619](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L619)

Get or set the radius scale domain

##### Returns

`ScaleLinear`\<`number`, `number`\>

#### Call Signature

> **radiusScale**(`v`): `this`

Defined in: [HexbinLayer.ts:620](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L620)

Get or set the radius scale domain

##### Parameters

###### v

`ScaleLinear`\<`number`, `number`\>

##### Returns

`this`

***

### colorValue()

#### Call Signature

> **colorValue**(): (`d`) => `number`

Defined in: [HexbinLayer.ts:632](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L632)

Get or set the value mapper for the color scale

##### Returns

`Function`

###### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

###### Returns

`number`

##### Default

```ts
the length of the data in the hexbin
```

#### Call Signature

> **colorValue**(`v`): `this`

Defined in: [HexbinLayer.ts:633](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L633)

Get or set the value mapper for the color scale

##### Parameters

###### v

(`d`) => `number`

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

> **radiusValue**(): (`d`) => `number`

Defined in: [HexbinLayer.ts:646](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L646)

Get or set the value mapper for the radius scale

##### Returns

`Function`

###### Parameters

###### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

###### Returns

`number`

##### Default

```ts
the length of the data in the hexbin
```

#### Call Signature

> **radiusValue**(`v`): `this`

Defined in: [HexbinLayer.ts:647](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L647)

Get or set the value mapper for the radius scale

##### Parameters

###### v

(`d`) => `number`

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

Defined in: [HexbinLayer.ts:660](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L660)

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

Defined in: [HexbinLayer.ts:661](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L661)

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

Defined in: [HexbinLayer.ts:675](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L675)

Get or set the data to be binned by the hexbin layer.
Triggers a redraw of the hexbins when set.

##### Returns

`Data`[]

#### Call Signature

> **data**(`v`): `this`

Defined in: [HexbinLayer.ts:676](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L676)

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

Defined in: [HexbinLayer.ts:677](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L677)

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

Defined in: [HexbinLayer.ts:696](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L696)

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

Defined in: [HexbinLayer.ts:703](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L703)

#### Returns

`Dispatch`\<`SVGPathElement`\>

***

### hoverHandler()

#### Call Signature

> **hoverHandler**(): [`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

Defined in: [HexbinLayer.ts:708](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L708)

Get or set the hover handler for the hexbin layer.

##### Returns

[`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

#### Call Signature

> **hoverHandler**(`v`): `this`

Defined in: [HexbinLayer.ts:709](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L709)

Get or set the hover handler for the hexbin layer.

##### Parameters

###### v

[`HexbinHoverHandler`](../interfaces/HexbinHoverHandler.md)\<`Data`\>

##### Returns

`this`

***

### tooltip()

> **tooltip**(`tooltip`): `this`

Defined in: [HexbinLayer.ts:723](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L723)

Get or set the tooltip content and options for the hexbin layer.

#### Parameters

##### tooltip

[`TooltipOptions`](../type-aliases/TooltipOptions.md)\<`Data`\>

#### Returns

`this`

***

### getTooltip()

> **getTooltip**(): `undefined` \| `Tooltip`

Defined in: [HexbinLayer.ts:736](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L736)

Get the tooltip instance attached to the hexbin layer

#### Returns

`undefined` \| `Tooltip`

#### Overrides

`L.SVG.getTooltip`

***

### bindTooltip()

> **bindTooltip**(`content`, `options`?): `this`

Defined in: [HexbinLayer.ts:744](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L744)

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

Defined in: [HexbinLayer.ts:761](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L761)

Unbind the tooltip from the hexbin layer

#### Returns

`this`

#### Overrides

`L.SVG.unbindTooltip`

***

### getLatLngs()

> **getLatLngs**(): `LatLng`[]

Defined in: [HexbinLayer.ts:770](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L770)

#### Returns

`LatLng`[]

***

### toGeoJSON()

> **toGeoJSON**(): `Feature`\<`MultiPoint`, `LatLng`\>

Defined in: [HexbinLayer.ts:779](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L779)

#### Returns

`Feature`\<`MultiPoint`, `LatLng`\>

***

### \_accessor()

> `protected` **\_accessor**(`d`): `LatLngExpression`

Defined in: [HexbinLayer.ts:240](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L240)

#### Parameters

##### d

`Data`

#### Returns

`LatLngExpression`

***

### \_destroyContainer()

> `protected` **\_destroyContainer**(): `void`

Defined in: [HexbinLayer.ts:285](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L285)

Clean up the svg container

#### Returns

`void`

***

### \_linearlySpace()

> `protected` **\_linearlySpace**(`from`, `to`, `length`): `number`[]

Defined in: [HexbinLayer.ts:324](https://github.com/lsdch/leaflet-hexbin/blob/d51d1f79bbf68a02c863ce063b78996b0fea3940/packages/leaflet-hexbin/src/HexbinLayer.ts#L324)

#### Parameters

##### from

`number`

##### to

`number`

##### length

`number`

#### Returns

`number`[]
