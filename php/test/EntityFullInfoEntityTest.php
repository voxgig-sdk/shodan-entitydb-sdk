<?php
declare(strict_types=1);

// EntityFullInfo entity test

require_once __DIR__ . '/../shodanentitydb_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EntityFullInfoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ShodanEntitydbSDK::test(null, null);
        $ent = $testsdk->EntityFullInfo(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = entity_full_info_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "entity_full_info." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $entity_full_info_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.entity_full_info")));
        $entity_full_info_ref01_data = null;
        if (count($entity_full_info_ref01_data_raw) > 0) {
            $entity_full_info_ref01_data = Helpers::to_map($entity_full_info_ref01_data_raw[0][1]);
        }

        // LOAD
        $entity_full_info_ref01_ent = $client->EntityFullInfo(null);
        $entity_full_info_ref01_match_dt0 = [];
        $entity_full_info_ref01_data_dt0_loaded = $entity_full_info_ref01_ent->load($entity_full_info_ref01_match_dt0, null);
        $this->assertNotNull($entity_full_info_ref01_data_dt0_loaded);

    }
}

function entity_full_info_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/entity_full_info/EntityFullInfoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ShodanEntitydbSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["entity_full_info01", "entity_full_info02", "entity_full_info03", "symbol01", "symbol02", "symbol03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID" => $idmap,
        "SHODANENTITYDB_TEST_LIVE" => "FALSE",
        "SHODANENTITYDB_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SHODANENTITYDB_TEST_ENTITY_FULL_INFO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SHODANENTITYDB_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
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
