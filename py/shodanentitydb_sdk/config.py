# ShodanEntitydb SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ShodanEntitydb",
            "slug": "shodan-entitydb",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://entitydb.shodan.io",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "entity": {},
                "entity_full_info": {},
                "health_check": {},
                "last_update": {},
            },
        },
        "entity": {
      "entity": {
        "fields": [
          {
            "name": "cik",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "entity",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "entity_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "executives",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 3,
              "depth": 3,
            },
          },
          {
            "name": "finance_data",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 13,
              "depth": 3,
            },
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "tickers",
            "req": True,
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "entity",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/entities",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "entities",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.entities`",
                },
                "parts": [
                  "api",
                  "entities",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 3,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/entities/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "entities",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.entity`",
                },
                "parts": [
                  "api",
                  "entities",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "entity_full_info": {
        "fields": [
          {
            "name": "entity",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "executives",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 3,
              "depth": 3,
            },
          },
          {
            "name": "finance_data",
            "req": True,
            "type": "`$ARRAY`",
            "union": {
              "branches": 2,
              "count": 13,
              "depth": 3,
            },
          },
        ],
        "name": "entity_full_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "GOOGL",
                      "kind": "param",
                      "name": "symbol",
                      "orig": "symbol",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/entities/symbol/{symbol}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "entities",
                  },
                  {
                    "lit": "symbol",
                  },
                  {
                    "var": "symbol",
                  },
                ],
                "select": {
                  "exist": [
                    "symbol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "entities",
                  "symbol",
                  "{symbol}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "symbol",
            ],
          ],
        },
      },
      "health_check": {
        "fields": [],
        "name": "health_check",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/health_check",
                "segments": [
                  {
                    "lit": "health_check",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "health_check",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "last_update": {
        "fields": [
          {
            "name": "last_updated",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "last_update",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/last_updated",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "last_updated",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "last_updated",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
