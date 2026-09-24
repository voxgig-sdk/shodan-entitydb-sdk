import { ShodanEntitydbEntityBase } from '../ShodanEntitydbEntityBase';
import type { ShodanEntitydbSDK } from '../ShodanEntitydbSDK';
import type { Control } from '../types';
import type { LightEntity, LightEntityListMatch } from '../ShodanEntitydbTypes';
declare class LightEntityEntity extends ShodanEntitydbEntityBase<LightEntity> {
    constructor(client: ShodanEntitydbSDK, entopts: any);
    make(this: LightEntityEntity): LightEntityEntity;
    list(this: any, reqmatch?: LightEntityListMatch, ctrl?: Control): Promise<LightEntityEntity[]>;
}
export { LightEntityEntity };
