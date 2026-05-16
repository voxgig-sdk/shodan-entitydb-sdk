# ShodanEntitydb PHP SDK Reference

Complete API reference for the ShodanEntitydb PHP SDK.


## ShodanEntitydbSDK

### Constructor

```php
require_once __DIR__ . '/shodan-entitydb_sdk.php';

$client = new ShodanEntitydbSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## EntityEntity

```php
$entity = $client->Entity();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Entity()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Entity()->load(["id" => "entity_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EntityEntity`

Create a new `EntityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EntityFullInfoEntity

```php
$entity_full_info = $client->EntityFullInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entity` | ``$OBJECT`` | Yes |  |
| `executif` | ``$ARRAY`` | Yes |  |
| `finance_data` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->EntityFullInfo()->load(["id" => "entity_full_info_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EntityFullInfoEntity`

Create a new `EntityFullInfoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HealthCheckEntity

```php
$health_check = $client->HealthCheck();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->HealthCheck()->load(["id" => "health_check_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HealthCheckEntity`

Create a new `HealthCheckEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LastUpdateEntity

```php
$last_update = $client->LastUpdate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->LastUpdate()->load(["id" => "last_update_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LastUpdateEntity`

Create a new `LastUpdateEntity` instance with the same client and
options.

#### `getName(): string`

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

