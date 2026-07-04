# ShodanEntitydb TypeScript SDK Reference

Complete API reference for the ShodanEntitydb TypeScript SDK.


## ShodanEntitydbSDK

### Constructor

```ts
new ShodanEntitydbSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ShodanEntitydbSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ShodanEntitydbSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ShodanEntitydbSDK` instance in test mode.


### Instance Methods

#### `Entity(data?: object)`

Create a new `Entity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntityEntity` instance.

#### `EntityFullInfo(data?: object)`

Create a new `EntityFullInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntityFullInfoEntity` instance.

#### `HealthCheck(data?: object)`

Create a new `HealthCheck` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthCheckEntity` instance.

#### `LastUpdate(data?: object)`

Create a new `LastUpdate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LastUpdateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ShodanEntitydbSDK.test()`.

**Returns:** `ShodanEntitydbSDK` instance in test mode.


---

## EntityEntity

```ts
const entity = client.Entity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | ``$INTEGER`` | Yes |  |
| `entity` | ``$OBJECT`` | Yes |  |
| `entity_name` | ``$STRING`` | Yes |  |
| `executif` | ``$ARRAY`` | Yes |  |
| `finance_data` | ``$ARRAY`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `ticker` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Entity().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Entity().load({ id: 'entity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntityEntity` instance with the same client and
options.

#### `client()`

Return the parent `ShodanEntitydbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EntityFullInfoEntity

```ts
const entity_full_info = client.EntityFullInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | ``$OBJECT`` | Yes |  |
| `executif` | ``$ARRAY`` | Yes |  |
| `finance_data` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EntityFullInfo().load({ id: 'entity_full_info_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntityFullInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `ShodanEntitydbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthCheckEntity

```ts
const health_check = client.HealthCheck()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.HealthCheck().load({ id: 'health_check_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthCheckEntity` instance with the same client and
options.

#### `client()`

Return the parent `ShodanEntitydbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LastUpdateEntity

```ts
const last_update = client.LastUpdate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LastUpdate().load({ id: 'last_update_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LastUpdateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ShodanEntitydbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ShodanEntitydbSDK({
  feature: {
    test: { active: true },
  }
})
```

