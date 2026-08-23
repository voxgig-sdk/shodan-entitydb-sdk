# ShodanEntitydb SDK configuration

module ShodanEntitydbConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ShodanEntitydb",
        "slug" => "shodan-entitydb",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://entitydb.shodan.io",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "entity" => {},
          "entity_full_info" => {},
          "health_check" => {},
          "last_update" => {},
        },
      },
      "entity" => {
        "entity" => {
          "fields" => [
            {
              "name" => "cik",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "entity",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "entity_name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "executives",
              "req" => true,
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 2,
                "count" => 3,
                "depth" => 3,
              },
            },
            {
              "name" => "finance_data",
              "req" => true,
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 2,
                "count" => 13,
                "depth" => 3,
              },
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "tickers",
              "req" => true,
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "entity",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/entities",
                  "parts" => [
                    "api",
                    "entities",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.entities`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 3,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/entities/{id}",
                  "parts" => [
                    "api",
                    "entities",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.entity`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "entity_full_info" => {
          "fields" => [
            {
              "name" => "entity",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "executives",
              "req" => true,
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 2,
                "count" => 3,
                "depth" => 3,
              },
            },
            {
              "name" => "finance_data",
              "req" => true,
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 2,
                "count" => 13,
                "depth" => 3,
              },
            },
          ],
          "name" => "entity_full_info",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "GOOGL",
                        "kind" => "param",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/entities/symbol/{symbol}",
                  "parts" => [
                    "api",
                    "entities",
                    "symbol",
                    "{symbol}",
                  ],
                  "select" => {
                    "exist" => [
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "symbol",
              ],
            ],
          },
        },
        "health_check" => {
          "fields" => [],
          "name" => "health_check",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/health_check",
                  "parts" => [
                    "health_check",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "last_update" => {
          "fields" => [
            {
              "name" => "last_updated",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "last_update",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/last_updated",
                  "parts" => [
                    "api",
                    "last_updated",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ShodanEntitydbFeatures.make_feature(name)
  end
end
