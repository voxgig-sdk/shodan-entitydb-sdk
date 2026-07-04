# ShodanEntitydb Ruby SDK Reference

Complete API reference for the ShodanEntitydb Ruby SDK.


## ShodanEntitydbSDK

### Constructor

```ruby
require_relative 'shodan-entitydb_sdk'

client = ShodanEntitydbSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ShodanEntitydbSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ShodanEntitydbSDK.test
```


### Instance Methods

#### `Entity(data = nil)`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `EntityFullInfo(data = nil)`

Create a new `EntityFullInfo` entity instance. Pass `nil` for no initial data.

#### `HealthCheck(data = nil)`

Create a new `HealthCheck` entity instance. Pass `nil` for no initial data.

#### `LastUpdate(data = nil)`

Create a new `LastUpdate` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## EntityEntity

```ruby
entity = client.Entity
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Entity.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Entity.load({ "id" => "entity_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EntityFullInfoEntity

```ruby
entity_full_info = client.EntityFullInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | ``$OBJECT`` | Yes |  |
| `executif` | ``$ARRAY`` | Yes |  |
| `finance_data` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EntityFullInfo.load({ "id" => "entity_full_info_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EntityFullInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HealthCheckEntity

```ruby
health_check = client.HealthCheck
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.HealthCheck.load({ "id" => "health_check_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HealthCheckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LastUpdateEntity

```ruby
last_update = client.LastUpdate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.LastUpdate.load({ "id" => "last_update_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LastUpdateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ShodanEntitydbSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

