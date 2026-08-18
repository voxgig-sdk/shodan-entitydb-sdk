package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ShodanEntitydb",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://entitydb.shodan.io",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"entity": map[string]any{},
				"entity_full_info": map[string]any{},
				"health_check": map[string]any{},
				"last_update": map[string]any{},
			},
		},
		"entity": map[string]any{
			"entity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cik",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "entity",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "entity_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "executives",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 3,
							"depth": 3,
						},
					},
					map[string]any{
						"name": "finance_data",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 13,
							"depth": 3,
						},
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tickers",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "entity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/entities",
								"parts": []any{
									"api",
									"entities",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.entities`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 3,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/entities/{id}",
								"parts": []any{
									"api",
									"entities",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.entity`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entity_full_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "entity",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "executives",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 3,
							"depth": 3,
						},
					},
					map[string]any{
						"name": "finance_data",
						"req": true,
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 13,
							"depth": 3,
						},
					},
				},
				"name": "entity_full_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "GOOGL",
											"kind": "param",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/entities/symbol/{symbol}",
								"parts": []any{
									"api",
									"entities",
									"symbol",
									"{symbol}",
								},
								"select": map[string]any{
									"exist": []any{
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"symbol",
						},
					},
				},
			},
			"health_check": map[string]any{
				"fields": []any{},
				"name": "health_check",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/health_check",
								"parts": []any{
									"health_check",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"last_update": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "last_updated",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "last_update",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/last_updated",
								"parts": []any{
									"api",
									"last_updated",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
