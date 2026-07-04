-- Typed models for the ShodanEntitydb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entity
---@field cik number
---@field entity table
---@field entity_name string
---@field executif table
---@field finance_data table
---@field id number
---@field ticker table

---@class EntityLoadMatch
---@field id number

---@class EntityListMatch

---@class EntityFullInfo
---@field entity table
---@field executif table
---@field finance_data table

---@class EntityFullInfoLoadMatch
---@field symbol string

---@class HealthCheck

---@class HealthCheckLoadMatch

---@class LastUpdate
---@field last_updated string

---@class LastUpdateLoadMatch

local M = {}

return M
