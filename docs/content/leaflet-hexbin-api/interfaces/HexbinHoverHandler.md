[leaflet-hexbin](../globals.md) / HexbinHoverHandler

# Interface: HexbinHoverHandler\<Data\>

Defined in: [HexbinHoverHandler.ts:8](https://github.com/lsdch/leaflet-hexbin/blob/b02fe5f1f943f4751a95997daaace5cd426f6fd5/packages/leaflet-hexbin/src/HexbinHoverHandler.ts#L8)

Interface for handling hover events on hexbins.

## Type Parameters

• **Data**

## Methods

### mouseover()

> **mouseover**(`svg`, `hexLayer`, `event`, `data`): `void`

Defined in: [HexbinHoverHandler.ts:9](https://github.com/lsdch/leaflet-hexbin/blob/b02fe5f1f943f4751a95997daaace5cd426f6fd5/packages/leaflet-hexbin/src/HexbinHoverHandler.ts#L9)

#### Parameters

##### svg

`SVGPathElement`

##### hexLayer

[`HexbinLayer`](../classes/HexbinLayer.md)\<`Data`\>

##### event

`MouseEvent`

##### data

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

#### Returns

`void`

***

### mouseout()

> **mouseout**(`svg`, `hexLayer`, `event`, `data`): `void`

Defined in: [HexbinHoverHandler.ts:10](https://github.com/lsdch/leaflet-hexbin/blob/b02fe5f1f943f4751a95997daaace5cd426f6fd5/packages/leaflet-hexbin/src/HexbinHoverHandler.ts#L10)

#### Parameters

##### svg

`SVGPathElement`

##### hexLayer

[`HexbinLayer`](../classes/HexbinLayer.md)\<`Data`\>

##### event

`MouseEvent`

##### data

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

#### Returns

`void`
