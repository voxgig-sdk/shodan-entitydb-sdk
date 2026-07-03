# ShodanEntitydb SDK

Shodan Business Entities client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install shodan-entitydb
```

**Python**
```bash
pip install shodan-entitydb-sdk
```

**PHP**
```bash
composer require voxgig/shodan-entitydb-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/shodan-entitydb-sdk/go
```

**Ruby**
```bash
gem install shodan-entitydb-sdk
```

**Lua**
```bash
luarocks install shodan-entitydb-sdk
```

## Quickstart

### TypeScript

```ts
import { ShodanEntitydbSDK } from 'shodan-entitydb'

const client = new ShodanEntitydbSDK({
  apikey: process.env.SHODAN-ENTITYDB_APIKEY,
})

// List all entitys
const entitys = await client.Entity().list()
console.log(entitys.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o shodan-entitydb-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "shodan-entitydb": {
      "command": "/abs/path/to/shodan-entitydb-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Entity** |  | `/api/entities` |
| **EntityFullInfo** |  | `/api/entities/symbol/{symbol}` |
| **HealthCheck** |  | `/health_check` |
| **LastUpdate** |  | `/api/last_updated` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from shodanentitydb_sdk import ShodanEntitydbSDK

client = ShodanEntitydbSDK({
    "apikey": os.environ.get("SHODAN-ENTITYDB_APIKEY"),
})

# List all entitys
entitys, err = client.Entity().list()
print(entitys)

# Load a specific entity
entity, err = client.Entity().load({"id": "example_id"})
print(entity)
```

### PHP

```php
<?php
require_once 'shodanentitydb_sdk.php';

$client = new ShodanEntitydbSDK([
    "apikey" => getenv("SHODAN-ENTITYDB_APIKEY"),
]);

// List all entitys
[$entitys, $err] = $client->Entity()->list();
print_r($entitys);

// Load a specific entity
[$entity, $err] = $client->Entity()->load(["id" => "example_id"]);
print_r($entity);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/shodan-entitydb-sdk/go"

client := sdk.NewShodanEntitydbSDK(map[string]any{
    "apikey": os.Getenv("SHODAN-ENTITYDB_APIKEY"),
})

// List all entitys
entitys, err := client.Entity(nil).List(nil, nil)
fmt.Println(entitys)
```

### Ruby

```ruby
require_relative "ShodanEntitydb_sdk"

client = ShodanEntitydbSDK.new({
  "apikey" => ENV["SHODAN-ENTITYDB_APIKEY"],
})

# List all entitys
entitys, err = client.Entity().list
puts entitys

# Load a specific entity
entity, err = client.Entity().load({ "id" => "example_id" })
puts entity
```

### Lua

```lua
local sdk = require("shodan-entitydb_sdk")

local client = sdk.new({
  apikey = os.getenv("SHODAN-ENTITYDB_APIKEY"),
})

-- List all entitys
local entitys, err = client:Entity():list()
print(entitys)

-- Load a specific entity
local entity, err = client:Entity():load({ id = "example_id" })
print(entity)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ShodanEntitydbSDK.test()
const result = await client.Entity().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ShodanEntitydbSDK.test()
result, err = client.Entity().load({"id": "test01"})
```

### PHP

```php
$client = ShodanEntitydbSDK::test();
[$result, $err] = $client->Entity()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Entity(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ShodanEntitydbSDK.test
result, err = client.Entity().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Entity():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Shodan Business Entities OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
