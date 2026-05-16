<?php
declare(strict_types=1);

// LastUpdate entity test

require_once __DIR__ . '/../shodanentitydb_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class LastUpdateEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ShodanEntitydbSDK::test(null, null);
        $ent = $testsdk->LastUpdate(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = last_update_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "last_update." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SHODANENTITYDB_TEST_LAST_UPDATE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $last_update_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.last_update")));
        $last_update_ref01_data = null;
        if (count($last_update_ref01_data_raw) > 0) {
            $last_update_ref01_data = Helpers::to_map($last_update_ref01_data_raw[0][1]);
        }

        // LOAD
        $last_update_ref01_ent = $client->LastUpdate(null);
        $last_update_ref01_match_dt0 = [];
        [$last_update_ref01_data_dt0_loaded, $err] = $last_update_ref01_ent->load($last_update_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($last_update_ref01_data_dt0_loaded);

    }
}

function last_update_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/last_update/LastUpdateTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ShodanEntitydbSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["last_update01", "last_update02", "last_update03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SHODANENTITYDB_TEST_LAST_UPDATE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SHODANENTITYDB_TEST_LAST_UPDATE_ENTID" => $idmap,
        "SHODANENTITYDB_TEST_LIVE" => "FALSE",
        "SHODANENTITYDB_TEST_EXPLAIN" => "FALSE",
        "SHODANENTITYDB_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SHODANENTITYDB_TEST_LAST_UPDATE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SHODANENTITYDB_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["SHODANENTITYDB_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ShodanEntitydbSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SHODANENTITYDB_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SHODANENTITYDB_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
