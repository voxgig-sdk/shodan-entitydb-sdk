export interface Entity {
    cik: number;
    entity: Record<string, any>;
    entity_name: string;
    executives: any[];
    finance_data: any[];
    id: number;
    tickers: any[];
}
export interface EntityLoadMatch {
    id: number;
}
export interface EntityListMatch {
    cik?: number;
    entity?: Record<string, any>;
    entity_name?: string;
    executives?: any[];
    finance_data?: any[];
    id?: number;
    tickers?: any[];
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
