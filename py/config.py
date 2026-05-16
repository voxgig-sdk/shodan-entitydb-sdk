# ShodanEntitydb SDK configuration


def make_config():
    return {
        "main": {
            "name": "ShodanEntitydb",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://entitydb.shodan.io",
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "index$": 0,
          },
          {
            "name": "entity",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "entity_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "executif",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "finance_data",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "ticker",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "entity",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/api/entities",
                "parts": [
                  "api",
                  "entities",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/entities/{id}",
                "parts": [
                  "api",
                  "entities",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "active": True,
            "index$": 0,
          },
          {
            "name": "executif",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "finance_data",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "entity_full_info",
        "op": {
          "load": {
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/entities/symbol/{symbol}",
                "parts": [
                  "api",
                  "entities",
                  "symbol",
                  "{symbol}",
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/health_check",
                "parts": [
                  "health_check",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "active": True,
            "index$": 0,
          },
        ],
        "name": "last_update",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/api/last_updated",
                "parts": [
                  "api",
                  "last_updated",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
