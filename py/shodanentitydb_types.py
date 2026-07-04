# Typed models for the ShodanEntitydb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Entity:
    cik: int
    entity: dict
    entity_name: str
    executif: list
    finance_data: list
    id: int
    ticker: list


@dataclass
class EntityLoadMatch:
    id: int


@dataclass
class EntityListMatch:
    cik: Optional[int] = None
    entity: Optional[dict] = None
    entity_name: Optional[str] = None
    executif: Optional[list] = None
    finance_data: Optional[list] = None
    id: Optional[int] = None
    ticker: Optional[list] = None


@dataclass
class EntityFullInfo:
    entity: dict
    executif: list
    finance_data: list


@dataclass
class EntityFullInfoLoadMatch:
    symbol: str


@dataclass
class HealthCheck:
    pass


@dataclass
class HealthCheckLoadMatch:
    pass


@dataclass
class LastUpdate:
    last_updated: str


@dataclass
class LastUpdateLoadMatch:
    last_updated: Optional[str] = None

