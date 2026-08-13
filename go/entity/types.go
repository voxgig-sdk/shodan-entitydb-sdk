// Typed models for the ShodanEntitydb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/shodan-entitydb-sdk/go/core"
)

// Entity is the typed data model for the entity entity.
type Entity struct {
	Cik int `json:"cik"`
	Entity map[string]any `json:"entity"`
	EntityName string `json:"entity_name"`
	Executives []any `json:"executives"`
	FinanceData []any `json:"finance_data"`
	Id int `json:"id"`
	Tickers []any `json:"tickers"`
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
	Executives *[]any `json:"executives,omitempty"`
	FinanceData *[]any `json:"finance_data,omitempty"`
	Id *int `json:"id,omitempty"`
	Tickers *[]any `json:"tickers,omitempty"`
}

// EntityFullInfo is the typed data model for the entity_full_info entity.
type EntityFullInfo struct {
	Entity map[string]any `json:"entity"`
	Executives []any `json:"executives"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
