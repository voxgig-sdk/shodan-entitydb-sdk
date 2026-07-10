# ShodanEntitydb Lua SDK Reference

Complete API reference for the ShodanEntitydb Lua SDK.


## ShodanEntitydbSDK

### Constructor

```lua
local sdk = require("shodan-entitydb_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Entity(data)`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `EntityFullInfo(data)`

Create a new `EntityFullInfo` entity instance. Pass `nil` for no initial data.

#### `HealthCheck(data)`

Create a new `HealthCheck` entity instance. Pass `nil` for no initial data.

#### `LastUpdate(data)`

Create a new `LastUpdate` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## EntityEntity

```lua
local entity = client:Entity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `number` | Yes |  |
| `entity` | `table` | Yes |  |
| `entity_name` | `string` | Yes |  |
| `executif` | `table` | Yes |  |
| `finance_data` | `table` | Yes |  |
| `id` | `number` | Yes |  |
| `ticker` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Entity():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Entity():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EntityFullInfoEntity

```lua
local entity_full_info = client:EntityFullInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | `table` | Yes |  |
| `executif` | `table` | Yes |  |
| `finance_data` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:EntityFullInfo():load({ symbol = "symbol" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityFullInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HealthCheckEntity

```lua
local health_check = client:HealthCheck(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:HealthCheck():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthCheckEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LastUpdateEntity

```lua
local last_update = client:LastUpdate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:LastUpdate():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LastUpdateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

