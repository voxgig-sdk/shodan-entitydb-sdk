import { ShodanEntitydbEntityBase } from '../ShodanEntitydbEntityBase';
import type { ShodanEntitydbSDK } from '../ShodanEntitydbSDK';
import type { Control } from '../types';
import type { Entity, EntityLoadMatch } from '../ShodanEntitydbTypes';
declare class EntityEntity extends ShodanEntitydbEntityBase<Entity> {
    constructor(client: ShodanEntitydbSDK, entopts: any);
    make(this: EntityEntity): EntityEntity;
    load(this: any, reqmatch?: EntityLoadMatch, ctrl?: Control): Promise<EntityEntity>;
}
export { EntityEntity };
