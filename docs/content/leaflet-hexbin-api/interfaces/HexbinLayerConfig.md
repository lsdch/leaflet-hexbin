[leaflet-hexbin](../globals.md) / HexbinLayerConfig

# Interface: HexbinLayerConfig\<Data\>

Defined in: [HexbinLayer.ts:34](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L34)

Hexbin layer configuration options this can be provided when instantiating a new hexbin layer.

## Type Parameters

• **Data**

## Properties

### radius?

> `optional` **radius**: `number`

Defined in: [HexbinLayer.ts:42](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L42)

Hex grid cell radius in pixels.
This value should be a positive number.
This radius controls the radius of the hexagons used to bin the data
but not necessarily to draw each individual hexbin.

#### Default

```ts
12
```

***

### opacity?

> `optional` **opacity**: `number` \| \[`number`, `number`\]

Defined in: [HexbinLayer.ts:49](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L49)

Sets the opacity on the hexbin layer.
This value should be a number between 0 and 1.
If an array is provided, the first element is the minimum opacity and the second is the maximum.

#### Default

```ts
0.6
```

***

### opacityScaleExtent?

> `optional` **opacityScaleExtent**: \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:54](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L54)

Opacity scale extent: [min, max] domain for opacity interpolation.

#### Default

```ts
[1, undefined]
```

***

### duration?

> `optional` **duration**: `number`

Defined in: [HexbinLayer.ts:59](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L59)

Duration of transition in milliseconds.

#### Default

```ts
200
```

***

### colorScaleExtent?

> `optional` **colorScaleExtent**: \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:65](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L65)

Color scale extent: [min, max] domain for color interpolation.

#### Default

```ts
[1, undefined]
```

***

### colorDomain?

> `optional` **colorDomain**: `null` \| `number`[]

Defined in: [HexbinLayer.ts:73](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L73)

This is used to override the default behavior, which is to derive the color domain from the data.
Normally, you can tweak the generation of the color domain using the colorScaleExtent option.
However, if you want to set a completely custom domain, you can provide it as an array of values with this option.
The array of values will be passed directly into the domain of the color scale before rendering.

#### Default

```ts
null
```

***

### colorRange?

> `optional` **colorRange**: `string`[]

Defined in: [HexbinLayer.ts:78](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L78)

Color range used to fill the hexbins.

#### Default

```ts
['#f7fbff', '#08306b']
```

***

### radiusScaleExtent?

> `optional` **radiusScaleExtent**: \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:84](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L84)

Radius scale extent: [min, max] domain for radius interpolation.

#### Default

```ts
[1, undefined]
```

***

### radiusDomain?

> `optional` **radiusDomain**: `null` \| `number`[]

Defined in: [HexbinLayer.ts:92](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L92)

This is used to override the default behavior, which is to derive the radius domain from the data.
Normally, you can tweak the generation of the radius domain using the radiusScaleExtent option.
However, if you want to set a completely custom domain, you can provide it as an array of values with this option.
The array of values will be passed directly into the domain of the radius scale before rendering.

#### Default

```ts
null
```

***

### radiusRange?

> `optional` **radiusRange**: `null` \| \[`number`, `number`\]

Defined in: [HexbinLayer.ts:97](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L97)

Sets the range of the radius scale used to size the hexbins.

#### Default

```ts
hex grid cell radius
```

***

### pointerEvents?

> `optional` **pointerEvents**: `string`

Defined in: [HexbinLayer.ts:103](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L103)

You should only modify this config option if you want to change the mouse event behavior on hexbins. This will modify when the events are propagated based on the visibility state and/or part of the hexbin being hovered.

#### Default

```ts
'all'
```

***

### noRedraw?

> `optional` **noRedraw**: `boolean`

Defined in: [HexbinLayer.ts:109](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L109)

If true, the layer will not be redrawn after data changes and hover handler binding.

#### Default

```ts
false
```

***

### colorBinding?

> `optional` **colorBinding**: [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:111](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L111)

***

### radiusBinding?

> `optional` **radiusBinding**: [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:112](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L112)

***

### opacityBinding?

> `optional` **opacityBinding**: [`ScaleBinding`](../type-aliases/ScaleBinding.md)\<`Data`\>

Defined in: [HexbinLayer.ts:113](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L113)

***

### fillBinding()?

> `optional` **fillBinding**: (`d`) => `string`

Defined in: [HexbinLayer.ts:114](https://github.com/lsdch/leaflet-hexbin/blob/a4d5cbb4acb651638e935d445e18747290017eba/packages/leaflet-hexbin/src/HexbinLayer.ts#L114)

#### Parameters

##### d

[`HexbinData`](../type-aliases/HexbinData.md)\<`Data`\>[]

#### Returns

`string`
