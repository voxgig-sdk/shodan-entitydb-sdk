import { ShodanEntitydbEntityBase } from '../ShodanEntitydbEntityBase';
import type { ShodanEntitydbSDK } from '../ShodanEntitydbSDK';
import type { Control } from '../types';
import type { EntityFullInfo, EntityFullInfoLoadMatch } from '../ShodanEntitydbTypes';
declare class EntityFullInfoEntity extends ShodanEntitydbEntityBase<EntityFullInfo> {
    constructor(client: ShodanEntitydbSDK, entopts: any);
    make(this: EntityFullInfoEntity): EntityFullInfoEntity;
    load(this: any, reqmatch?: EntityFullInfoLoadMatch, ctrl?: Control): Promise<EntityFullInfoEntity>;
}
export { EntityFullInfoEntity };
