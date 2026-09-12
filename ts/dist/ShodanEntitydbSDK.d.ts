import { EntityEntity } from './entity/EntityEntity';
import { EntityFullInfoEntity } from './entity/EntityFullInfoEntity';
import { HealthCheckEntity } from './entity/HealthCheckEntity';
import { LastUpdateEntity } from './entity/LastUpdateEntity';
export type * from './ShodanEntitydbTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ShodanEntitydbEntityBase } from './ShodanEntitydbEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ShodanEntitydbSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Entity(entopts?: Record<string, any>): EntityEntity;
    EntityFullInfo(entopts?: Record<string, any>): EntityFullInfoEntity;
    HealthCheck(entopts?: Record<string, any>): HealthCheckEntity;
    LastUpdate(entopts?: Record<string, any>): LastUpdateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ShodanEntitydbSDK;
    tester(testopts?: any, sdkopts?: any): ShodanEntitydbSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ShodanEntitydbSDK;
export { stdutil, config, BaseFeature, ShodanEntitydbEntityBase, ShodanEntitydbSDK, SDK, };
