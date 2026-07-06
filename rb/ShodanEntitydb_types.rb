# frozen_string_literal: true

# Typed models for the ShodanEntitydb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Entity entity data model.
#
# @!attribute [rw] cik
#   @return [Integer]
#
# @!attribute [rw] entity
#   @return [Hash]
#
# @!attribute [rw] entity_name
#   @return [String]
#
# @!attribute [rw] executif
#   @return [Array]
#
# @!attribute [rw] finance_data
#   @return [Array]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] ticker
#   @return [Array]
Entity = Struct.new(
  :cik,
  :entity,
  :entity_name,
  :executif,
  :finance_data,
  :id,
  :ticker,
  keyword_init: true
)

# Request payload for Entity#load.
#
# @!attribute [rw] id
#   @return [Integer]
EntityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Entity#list.
#
# @!attribute [rw] cik
#   @return [Integer, nil]
#
# @!attribute [rw] entity
#   @return [Hash, nil]
#
# @!attribute [rw] entity_name
#   @return [String, nil]
#
# @!attribute [rw] executif
#   @return [Array, nil]
#
# @!attribute [rw] finance_data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] ticker
#   @return [Array, nil]
EntityListMatch = Struct.new(
  :cik,
  :entity,
  :entity_name,
  :executif,
  :finance_data,
  :id,
  :ticker,
  keyword_init: true
)

# EntityFullInfo entity data model.
#
# @!attribute [rw] entity
#   @return [Hash]
#
# @!attribute [rw] executif
#   @return [Array]
#
# @!attribute [rw] finance_data
#   @return [Array]
EntityFullInfo = Struct.new(
  :entity,
  :executif,
  :finance_data,
  keyword_init: true
)

# Request payload for EntityFullInfo#load.
#
# @!attribute [rw] symbol
#   @return [String]
EntityFullInfoLoadMatch = Struct.new(
  :symbol,
  keyword_init: true
)

# HealthCheck entity data model.
class HealthCheck
end

# Request payload for HealthCheck#load.
class HealthCheckLoadMatch
end

# LastUpdate entity data model.
#
# @!attribute [rw] last_updated
#   @return [String]
LastUpdate = Struct.new(
  :last_updated,
  keyword_init: true
)

# Request payload for LastUpdate#load.
#
# @!attribute [rw] last_updated
#   @return [String, nil]
LastUpdateLoadMatch = Struct.new(
  :last_updated,
  keyword_init: true
)

