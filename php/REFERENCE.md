# ShodanEntitydb PHP SDK Reference

Complete API reference for the ShodanEntitydb PHP SDK.


## ShodanEntitydbSDK

### Constructor

```php
require_once __DIR__ . '/shodanentitydb_sdk.php';

$client = new ShodanEntitydbSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ShodanEntitydbSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ShodanEntitydbSDK::test();
```


### Instance Methods

#### `Entity($data = null)`

Create a new `EntityEntity` instance. Pass `null` for no initial data.

#### `EntityFullInfo($data = null)`

Create a new `EntityFullInfoEntity` instance. Pass `null` for no initial data.

#### `HealthCheck($data = null)`

Create a new `HealthCheckEntity` instance. Pass `null` for no initial data.

#### `LastUpdate($data = null)`

Create a new `LastUpdateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ShodanEntitydbUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EntityEntity

```php
$entity = $client->Entity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `int` | Yes |  |
| `entity` | `array` | Yes |  |
| `entity_name` | `string` | Yes |  |
| `executif` | `array` | Yes |  |
| `finance_data` | `array` | Yes |  |
| `id` | `int` | Yes |  |
| `ticker` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Entity()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Entity()->load(["id" => "entity_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntityEntity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EntityFullInfoEntity

```php
$entity_full_info = $client->EntityFullInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | `array` | Yes |  |
| `executif` | `array` | Yes |  |
| `finance_data` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EntityFullInfo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntityFullInfoEntity`

Create a new `EntityFullInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthCheckEntity

```php
$health_check = $client->HealthCheck();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->HealthCheck()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthCheckEntity`

Create a new `HealthCheckEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LastUpdateEntity

```php
$last_update = $client->LastUpdate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LastUpdate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LastUpdateEntity`

Create a new `LastUpdateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ShodanEntitydbSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

