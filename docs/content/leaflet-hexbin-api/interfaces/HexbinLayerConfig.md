[leaflet-hexbin](../globals.md) / HexbinLayerConfig

# Interface: HexbinLayerConfig

Defined in: [HexbinLayer.ts:31](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L31)

Hexbin layer configuration options this can be provided when instantiating a new hexbin layer.

## Properties

### radius?

> `optional` **radius**: `number`

Defined in: [HexbinLayer.ts:39](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L39)

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

Defined in: [HexbinLayer.ts:46](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L46)

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

Defined in: [HexbinLayer.ts:51](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L51)

Opacity scale extent: [min, max] domain for opacity interpolation.

#### Default

```ts
[1, undefined]
```

***

### duration?

> `optional` **duration**: `number`

Defined in: [HexbinLayer.ts:56](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L56)

Duration of transition in milliseconds.

#### Default

```ts
200
```

***

### colorScaleExtent?

> `optional` **colorScaleExtent**: \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:62](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L62)

Color scale extent: [min, max] domain for color interpolation.

#### Default

```ts
[1, undefined]
```

***

### colorDomain?

> `optional` **colorDomain**: `null` \| `number`[]

Defined in: [HexbinLayer.ts:70](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L70)

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

Defined in: [HexbinLayer.ts:75](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L75)

Color range used to fill the hexbins.

#### Default

```ts
['#f7fbff', '#08306b']
```

***

### radiusScaleExtent?

> `optional` **radiusScaleExtent**: \[`number`, `undefined` \| `number`\]

Defined in: [HexbinLayer.ts:81](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L81)

Radius scale extent: [min, max] domain for radius interpolation.

#### Default

```ts
[1, undefined]
```

***

### radiusDomain?

> `optional` **radiusDomain**: `null` \| `number`[]

Defined in: [HexbinLayer.ts:89](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L89)

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

Defined in: [HexbinLayer.ts:94](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L94)

Sets the range of the radius scale used to size the hexbins.

#### Default

```ts
hex grid cell radius
```

***

### pointerEvents?

> `optional` **pointerEvents**: `string`

Defined in: [HexbinLayer.ts:100](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L100)

You should only modify this config option if you want to change the mouse event behavior on hexbins. This will modify when the events are propagated based on the visibility state and/or part of the hexbin being hovered.

#### Default

```ts
'all'
```

***

### noRedraw?

> `optional` **noRedraw**: `boolean`

Defined in: [HexbinLayer.ts:106](https://github.com/lsdch/leaflet-hexbin/blob/e2b720325181d81c5f275d3289caeb47e903396b/packages/leaflet-hexbin/src/HexbinLayer.ts#L106)

If true, the layer will not be redrawn after data changes and hover handler binding.

#### Default

```ts
false
```
