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
                "light_entity": {},
            },
        },
        "entity": {
      "entity": {
        "fields": [
          {
            "name": "entity",
            "title": "Entity",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "executives",
            "title": "Executives",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "finance_data",
            "title": "Finance Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "entity",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "api",
                  "entities",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.entity`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 3,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
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
            "title": "Entity",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "executives",
            "title": "Executives",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "finance_data",
            "title": "Finance Data",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "entity_full_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "api",
                  "entities",
                  "symbol",
                  "{symbol}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "GOOGL",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "symbol",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
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
                "kind": "http",
                "method": "GET",
                "orig": "/health_check",
                "segments": [
                  {
                    "lit": "health_check",
                  },
                ],
                "parts": [
                  "health_check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Last Updated",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "last_update",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "api",
                  "last_updated",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "light_entity": {
        "fields": [
          {
            "name": "cik",
            "title": "Cik",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "entity_name",
            "title": "Entity Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "tickers",
            "title": "Tickers",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "light_entity",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
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
                "parts": [
                  "api",
                  "entities",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.entities`",
                },
                "args": {},
                "select": {},
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
