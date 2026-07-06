// Typed models for the ShodanEntitydb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Entity {
  cik: number
  entity: Record<string, any>
  entity_name: string
  executif: any[]
  finance_data: any[]
  id: number
  ticker: any[]
}

export interface EntityLoadMatch {
  id: number
}

export interface EntityListMatch {
  cik?: number
  entity?: Record<string, any>
  entity_name?: string
  executif?: any[]
  finance_data?: any[]
  id?: number
  ticker?: any[]
}

export interface EntityFullInfo {
  entity: Record<string, any>
  executif: any[]
  finance_data: any[]
}

export interface EntityFullInfoLoadMatch {
  symbol: string
}

export interface HealthCheck {
}

export interface HealthCheckLoadMatch {
}

export interface LastUpdate {
  last_updated: string
}

export interface LastUpdateLoadMatch {
  last_updated?: string
}

