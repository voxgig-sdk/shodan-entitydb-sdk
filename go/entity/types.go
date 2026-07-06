// Typed models for the ShodanEntitydb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Entity is the typed data model for the entity entity.
type Entity struct {
	Cik int `json:"cik"`
	Entity map[string]any `json:"entity"`
	EntityName string `json:"entity_name"`
	Executif []any `json:"executif"`
	FinanceData []any `json:"finance_data"`
	Id int `json:"id"`
	Ticker []any `json:"ticker"`
}

// EntityLoadMatch is the typed request payload for Entity.LoadTyped.
type EntityLoadMatch struct {
	Id int `json:"id"`
}

// EntityListMatch is the typed request payload for Entity.ListTyped.
type EntityListMatch struct {
	Cik *int `json:"cik,omitempty"`
	Entity *map[string]any `json:"entity,omitempty"`
	EntityName *string `json:"entity_name,omitempty"`
	Executif *[]any `json:"executif,omitempty"`
	FinanceData *[]any `json:"finance_data,omitempty"`
	Id *int `json:"id,omitempty"`
	Ticker *[]any `json:"ticker,omitempty"`
}

// EntityFullInfo is the typed data model for the entity_full_info entity.
type EntityFullInfo struct {
	Entity map[string]any `json:"entity"`
	Executif []any `json:"executif"`
	FinanceData []any `json:"finance_data"`
}

// EntityFullInfoLoadMatch is the typed request payload for EntityFullInfo.LoadTyped.
type EntityFullInfoLoadMatch struct {
	Symbol string `json:"symbol"`
}

// HealthCheck is the typed data model for the health_check entity.
type HealthCheck struct {
}

// HealthCheckLoadMatch is the typed request payload for HealthCheck.LoadTyped.
type HealthCheckLoadMatch struct {
}

// LastUpdate is the typed data model for the last_update entity.
type LastUpdate struct {
	LastUpdated string `json:"last_updated"`
}

// LastUpdateLoadMatch is the typed request payload for LastUpdate.LoadTyped.
type LastUpdateLoadMatch struct {
	LastUpdated *string `json:"last_updated,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
