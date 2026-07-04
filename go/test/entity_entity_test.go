package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/shodan-entitydb-sdk/go"
	"github.com/voxgig-sdk/shodan-entitydb-sdk/go/core"

	vs "github.com/voxgig-sdk/shodan-entitydb-sdk/go/utility/struct"
)

func TestEntityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Entity(nil)
		if ent == nil {
			t.Fatal("expected non-nil EntityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := entityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "entity." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SHODANENTITYDB_TEST_ENTITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		entityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.entity", setup.data)))
		var entityRef01Data map[string]any
		if len(entityRef01DataRaw) > 0 {
			entityRef01Data = core.ToMapAny(entityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = entityRef01Data

		// LIST
		entityRef01Ent := client.Entity(nil)
		entityRef01Match := map[string]any{}

		entityRef01ListResult, err := entityRef01Ent.List(entityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, entityRef01ListOk := entityRef01ListResult.([]any)
		if !entityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", entityRef01ListResult)
		}

		// LOAD
		entityRef01MatchDt0 := map[string]any{
			"id": entityRef01Data["id"],
		}
		entityRef01DataDt0Loaded, err := entityRef01Ent.Load(entityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		entityRef01DataDt0LoadResult := core.ToMapAny(entityRef01DataDt0Loaded)
		if entityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if entityRef01DataDt0LoadResult["id"] != entityRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func entityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "entity", "EntityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read entity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse entity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"entity01", "entity02", "entity03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SHODANENTITYDB_TEST_ENTITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SHODANENTITYDB_TEST_ENTITY_ENTID": idmap,
		"SHODANENTITYDB_TEST_LIVE":      "FALSE",
		"SHODANENTITYDB_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SHODANENTITYDB_TEST_ENTITY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SHODANENTITYDB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewShodanEntitydbSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SHODANENTITYDB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SHODANENTITYDB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
