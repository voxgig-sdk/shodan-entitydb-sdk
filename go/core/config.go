package core

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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"name": "cik",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "entity",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "entity_name",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "executif",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "finance_data",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "ticker",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 6,
					},
				},
				"name": "entity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/api/entities",
								"parts": []any{
									"api",
									"entities",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": 3,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entity_full_info": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "entity",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "executif",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "finance_data",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 2,
					},
				},
				"name": "entity_full_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "GOOGL",
											"kind": "param",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"last_update": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "last_updated",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
				},
				"name": "last_update",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
