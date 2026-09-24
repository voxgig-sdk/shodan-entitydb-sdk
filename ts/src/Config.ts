
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ShodanEntitydb',
        slug: "shodan-entitydb",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://entitydb.shodan.io",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        entity: {
        },
  
        entity_full_info: {
        },
  
        health_check: {
        },
  
        last_update: {
        },
  
        light_entity: {
        },
  
    }
  }


  entity = {
    "entity": {
      "fields": [
        {
          "name": "entity",
          "title": "Entity",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "executives",
          "title": "Executives",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "finance_data",
          "title": "Finance Data",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "api"
                },
                {
                  "lit": "entities"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "entities",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.entity`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 3
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "entity_full_info": {
      "fields": [
        {
          "name": "entity",
          "title": "Entity",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "executives",
          "title": "Executives",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "finance_data",
          "title": "Finance Data",
          "type": "`$ARRAY`",
          "req": true
        }
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
                  "lit": "api"
                },
                {
                  "lit": "entities"
                },
                {
                  "lit": "symbol"
                },
                {
                  "var": "symbol"
                }
              ],
              "parts": [
                "api",
                "entities",
                "symbol",
                "{symbol}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "GOOGL"
                  }
                ]
              },
              "select": {
                "exist": [
                  "symbol"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "health_check"
                }
              ],
              "parts": [
                "health_check"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "last_update": {
      "fields": [
        {
          "name": "last_updated",
          "title": "Last Updated",
          "type": "`$STRING`",
          "req": true
        }
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
                  "lit": "api"
                },
                {
                  "lit": "last_updated"
                }
              ],
              "parts": [
                "api",
                "last_updated"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "light_entity": {
      "fields": [
        {
          "name": "cik",
          "title": "Cik",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "entity_name",
          "title": "Entity Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "tickers",
          "title": "Tickers",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "api"
                },
                {
                  "lit": "entities"
                }
              ],
              "parts": [
                "api",
                "entities"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.entities`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

