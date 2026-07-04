# ShodanEntitydb Python SDK Reference

Complete API reference for the ShodanEntitydb Python SDK.


## ShodanEntitydbSDK

### Constructor

```python
from shodan-entitydb_sdk import ShodanEntitydbSDK

client = ShodanEntitydbSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ShodanEntitydbSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ShodanEntitydbSDK.test()
```


### Instance Methods

#### `Entity(data=None)`

Create a new `EntityEntity` instance. Pass `None` for no initial data.

#### `EntityFullInfo(data=None)`

Create a new `EntityFullInfoEntity` instance. Pass `None` for no initial data.

#### `HealthCheck(data=None)`

Create a new `HealthCheckEntity` instance. Pass `None` for no initial data.

#### `LastUpdate(data=None)`

Create a new `LastUpdateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EntityEntity

```python
entity = client.entity
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.entity.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.entity.load({"id": "entity_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EntityFullInfoEntity

```python
entity_full_info = client.entity_full_info
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | ``$OBJECT`` | Yes |  |
| `executif` | ``$ARRAY`` | Yes |  |
| `finance_data` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.entity_full_info.load({"id": "entity_full_info_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityFullInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthCheckEntity

```python
health_check = client.health_check
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.health_check.load({"id": "health_check_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthCheckEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LastUpdateEntity

```python
last_update = client.last_update
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.last_update.load({"id": "last_update_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LastUpdateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ShodanEntitydbSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

