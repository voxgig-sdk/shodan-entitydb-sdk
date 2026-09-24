export interface Entity {
    entity: Record<string, any>;
    executives: any[];
    finance_data: any[];
    id?: string;
}
export interface EntityLoadMatch {
    id: number;
}
export interface EntityFullInfo {
    entity: Record<string, any>;
    executives: any[];
    finance_data: any[];
}
export interface EntityFullInfoLoadMatch {
    symbol: string;
}
export interface HealthCheck {
}
export interface HealthCheckLoadMatch {
}
export interface LastUpdate {
    last_updated: string;
}
export interface LastUpdateLoadMatch {
    last_updated?: string;
}
export interface LightEntity {
    cik: number;
    entity_name: string;
    id: number;
    tickers: any[];
}
export interface LightEntityListMatch {
    cik?: number;
    entity_name?: string;
    id?: number;
    tickers?: any[];
}
