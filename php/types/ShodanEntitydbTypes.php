<?php
declare(strict_types=1);

// Typed models for the ShodanEntitydb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Entity entity data model. */
class Entity
{
    public int $cik;
    public array $entity;
    public string $entity_name;
    public array $executif;
    public array $finance_data;
    public int $id;
    public array $ticker;
}

/** Request payload for Entity#load. */
class EntityLoadMatch
{
    public int $id;
}

/** Match filter for Entity#list (any subset of Entity fields). */
class EntityListMatch
{
    public ?int $cik = null;
    public ?array $entity = null;
    public ?string $entity_name = null;
    public ?array $executif = null;
    public ?array $finance_data = null;
    public ?int $id = null;
    public ?array $ticker = null;
}

/** EntityFullInfo entity data model. */
class EntityFullInfo
{
    public array $entity;
    public array $executif;
    public array $finance_data;
}

/** Request payload for EntityFullInfo#load. */
class EntityFullInfoLoadMatch
{
    public string $symbol;
}

/** HealthCheck entity data model. */
class HealthCheck
{
}

/** Match filter for HealthCheck#load (any subset of HealthCheck fields). */
class HealthCheckLoadMatch
{
}

/** LastUpdate entity data model. */
class LastUpdate
{
    public string $last_updated;
}

/** Match filter for LastUpdate#load (any subset of LastUpdate fields). */
class LastUpdateLoadMatch
{
    public ?string $last_updated = null;
}

