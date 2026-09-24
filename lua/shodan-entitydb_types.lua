-- Typed models for the ShodanEntitydb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entity
---@field entity table
---@field executives table
---@field finance_data table
---@field id? string

---@class EntityLoadMatch
---@field id number

---@class EntityFullInfo
---@field entity table
---@field executives table
---@field finance_data table

---@class EntityFullInfoLoadMatch
---@field symbol string

---@class HealthCheck

---@class HealthCheckLoadMatch

---@class LastUpdate
---@field last_updated string

---@class LastUpdateLoadMatch
---@field last_updated? string

---@class LightEntity
---@field cik number
---@field entity_name string
---@field id number
---@field tickers table

---@class LightEntityListMatch
---@field cik? number
---@field entity_name? string
---@field id? number
---@field tickers? table

local M = {}

return M
