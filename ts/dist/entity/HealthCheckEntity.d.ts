import { ShodanEntitydbEntityBase } from '../ShodanEntitydbEntityBase';
import type { ShodanEntitydbSDK } from '../ShodanEntitydbSDK';
import type { Control } from '../types';
import type { HealthCheck, HealthCheckLoadMatch } from '../ShodanEntitydbTypes';
declare class HealthCheckEntity extends ShodanEntitydbEntityBase<HealthCheck> {
    constructor(client: ShodanEntitydbSDK, entopts: any);
    make(this: HealthCheckEntity): HealthCheckEntity;
    load(this: any, reqmatch?: HealthCheckLoadMatch, ctrl?: Control): Promise<HealthCheckEntity>;
}
export { HealthCheckEntity };
