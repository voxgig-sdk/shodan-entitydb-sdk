-- ShodanEntitydb SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ShodanEntitydb",
      slug = "shodan-entitydb",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://entitydb.shodan.io",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["entity"] = {},
        ["entity_full_info"] = {},
        ["health_check"] = {},
        ["last_update"] = {},
      },
    },
    entity = {
      ["entity"] = {
        ["fields"] = {
          {
            ["name"] = "cik",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "entity",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "entity_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "executives",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 3,
              ["depth"] = 3,
            },
          },
          {
            ["name"] = "finance_data",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 13,
              ["depth"] = 3,
            },
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tickers",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "entity",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/entities",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "entities",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.entities`",
                },
                ["parts"] = {
                  "api",
                  "entities",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 3,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/entities/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "entities",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.entity`",
                },
                ["parts"] = {
                  "api",
                  "entities",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["entity_full_info"] = {
        ["fields"] = {
          {
            ["name"] = "entity",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "executives",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 3,
              ["depth"] = 3,
            },
          },
          {
            ["name"] = "finance_data",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 13,
              ["depth"] = 3,
            },
          },
        },
        ["name"] = "entity_full_info",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "GOOGL",
                      ["kind"] = "param",
                      ["name"] = "symbol",
                      ["orig"] = "symbol",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/entities/symbol/{symbol}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "entities",
                  },
                  {
                    ["lit"] = "symbol",
                  },
                  {
                    ["var"] = "symbol",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "symbol",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "entities",
                  "symbol",
                  "{symbol}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "symbol",
            },
          },
        },
      },
      ["health_check"] = {
        ["fields"] = {},
        ["name"] = "health_check",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/health_check",
                ["segments"] = {
                  {
                    ["lit"] = "health_check",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "health_check",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["last_update"] = {
        ["fields"] = {
          {
            ["name"] = "last_updated",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "last_update",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/last_updated",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "last_updated",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "last_updated",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
