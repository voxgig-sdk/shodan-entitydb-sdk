# ShodanEntitydb SDK

Look up US business entities, financial overviews, and executive compensation by ticker or entity ID

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Shodan Business Entities

Shodan EntityDB is a lookup service for US-listed business entities, run by [Shodan](https://entitydb.shodan.io). It is a sibling of Shodan's better-known network intelligence products and focuses on company-level financial and leadership data rather than internet scanning.

What you get from the API:

- Entity metadata such as company name, CIK, SIC code, stock tickers, exchanges, business address, and phone number.
- Financial figures including revenue, net income, EBITDA, earnings per share, and filing dates.
- Executive details such as names, roles, salaries, stock awards, and total compensation.

The API is open: no Shodan account or API key is required, and lookups can be made directly by entity ID or by stock ticker symbol. The underlying dataset is refreshed monthly on the 1st.

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

## 30-second quickstart

### TypeScript

```ts
import { ShodanEntitydbSDK } from 'shodan-entitydb'

const client = new ShodanEntitydbSDK({})

// List all entitys
const entitys = await client.Entity().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Entity** | A US-listed business entity record; fetched via `/api/entities/{id}` or by ticker at `/api/entities/symbol/{ticker}`, and listed at `/entities`. | `/api/entities` |
| **EntityFullInfo** | Full detail view of an entity including metadata, financial overview, and executive compensation. | `/api/entities/symbol/{symbol}` |
| **HealthCheck** | Service health/status endpoint used to verify that the EntityDB API is reachable. | `/health_check` |
| **LastUpdate** | Reports when the dataset was last refreshed; EntityDB publishes monthly updates on the 1st of each month. | `/api/last_updated` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from shodanentitydb_sdk import ShodanEntitydbSDK

client = ShodanEntitydbSDK({})

# List all entitys
entitys, err = client.Entity(None).list(None, None)

# Load a specific entity
entity, err = client.Entity(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'shodanentitydb_sdk.php';

$client = new ShodanEntitydbSDK([]);

// List all entitys
[$entitys, $err] = $client->Entity(null)->list(null, null);

// Load a specific entity
[$entity, $err] = $client->Entity(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/shodan-entitydb-sdk/go"

client := sdk.NewShodanEntitydbSDK(map[string]any{})

// List all entitys
entitys, err := client.Entity(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "ShodanEntitydb_sdk"

client = ShodanEntitydbSDK.new({})

# List all entitys
entitys, err = client.Entity(nil).list(nil, nil)

# Load a specific entity
entity, err = client.Entity(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("shodan-entitydb_sdk")

local client = sdk.new({})

-- List all entitys
local entitys, err = client:Entity(nil):list(nil, nil)

-- Load a specific entity
local entity, err = client:Entity(nil):load(
  { id = "example_id" }, nil
)
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
client = ShodanEntitydbSDK.test(None, None)
result, err = client.Entity(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ShodanEntitydbSDK::test(null, null);
[$result, $err] = $client->Entity(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Entity(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ShodanEntitydbSDK.test(nil, nil)
result, err = client.Entity(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Entity(nil):load(
  { id = "test01" }, nil
)
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

## Using the Shodan Business Entities

- Upstream: [https://entitydb.shodan.io](https://entitydb.shodan.io)

- Free for non-commercial use without a Shodan account or API key.
- Commercial use requires an enterprise licence from Shodan.
- Data is marked "Shodan (R) - All rights reserved"; treat as proprietary and attribute the source.
- Updates are published monthly, starting on the 1st of each month.

---

Generated from the Shodan Business Entities OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
