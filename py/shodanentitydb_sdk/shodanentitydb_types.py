# Typed models for the ShodanEntitydb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EntityRequired(TypedDict):
    entity: dict
    executives: list
    finance_data: list


class Entity(EntityRequired, total=False):
    id: str


class EntityLoadMatch(TypedDict):
    id: int


class EntityFullInfo(TypedDict):
    entity: dict
    executives: list
    finance_data: list


class EntityFullInfoLoadMatch(TypedDict):
    symbol: str


class HealthCheck(TypedDict):
    pass


class HealthCheckLoadMatch(TypedDict):
    pass


class LastUpdate(TypedDict):
    last_updated: str


class LastUpdateLoadMatch(TypedDict, total=False):
    last_updated: str


class LightEntity(TypedDict):
    cik: int
    entity_name: str
    id: int
    tickers: list


class LightEntityListMatch(TypedDict, total=False):
    cik: int
    entity_name: str
    id: int
    tickers: list
