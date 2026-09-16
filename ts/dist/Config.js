"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ShodanEntitydb',
        slug: "shodan-entitydb",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://entitydb.shodan.io",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            entity: {},
            entity_full_info: {},
            health_check: {},
            last_update: {},
        }
    };
    entity = {
        "entity": {
            "fields": [
                {
                    "name": "cik",
                    "req": true,
                    "type": "`$INTEGER`"
                },
                {
                    "name": "entity",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "entity_name",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "executives",
                    "req": true,
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 2,
                        "count": 3,
                        "depth": 3
                    }
                },
                {
                    "name": "finance_data",
                    "req": true,
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 2,
                        "count": 13,
                        "depth": 3
                    }
                },
                {
                    "name": "id",
                    "req": true,
                    "type": "`$INTEGER`"
                },
                {
                    "name": "tickers",
                    "req": true,
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "entities"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entities`"
                            },
                            "parts": [
                                "api",
                                "entities"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.entity`"
                            },
                            "parts": [
                                "api",
                                "entities",
                                "{id}"
                            ]
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
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "executives",
                    "req": true,
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 2,
                        "count": 3,
                        "depth": 3
                    }
                },
                {
                    "name": "finance_data",
                    "req": true,
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 2,
                        "count": 13,
                        "depth": 3
                    }
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "entities",
                                "symbol",
                                "{symbol}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "symbol"
                    ]
                ]
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
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health_check",
                            "segments": [
                                {
                                    "lit": "health_check"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "health_check"
                            ]
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
                    "req": true,
                    "type": "`$STRING`"
                }
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "last_updated"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "last_updated"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map