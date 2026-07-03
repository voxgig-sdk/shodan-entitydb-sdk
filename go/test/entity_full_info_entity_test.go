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

func TestEntityFullInfoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EntityFullInfo(nil)
		if ent == nil {
			t.Fatal("expected non-nil EntityFullInfoEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := entity_full_infoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "entity_full_info." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		entityFullInfoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.entity_full_info", setup.data)))
		var entityFullInfoRef01Data map[string]any
		if len(entityFullInfoRef01DataRaw) > 0 {
			entityFullInfoRef01Data = core.ToMapAny(entityFullInfoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = entityFullInfoRef01Data

		// LOAD
		entityFullInfoRef01Ent := client.EntityFullInfo(nil)
		entityFullInfoRef01MatchDt0 := map[string]any{}
		entityFullInfoRef01DataDt0Loaded, err := entityFullInfoRef01Ent.Load(entityFullInfoRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if entityFullInfoRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func entity_full_infoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "entity_full_info", "EntityFullInfoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read entity_full_info test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse entity_full_info test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"entity_full_info01", "entity_full_info02", "entity_full_info03", "symbol01", "symbol02", "symbol03"},
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
	entidEnvRaw := os.Getenv("SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID": idmap,
		"SHODANENTITYDB_TEST_LIVE":      "FALSE",
		"SHODANENTITYDB_TEST_EXPLAIN":   "FALSE",
		"SHODANENTITYDB_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SHODANENTITYDB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["SHODANENTITYDB_APIKEY"],
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
