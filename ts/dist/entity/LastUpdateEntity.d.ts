import { ShodanEntitydbEntityBase } from '../ShodanEntitydbEntityBase';
import type { ShodanEntitydbSDK } from '../ShodanEntitydbSDK';
import type { Control } from '../types';
import type { LastUpdate, LastUpdateLoadMatch } from '../ShodanEntitydbTypes';
declare class LastUpdateEntity extends ShodanEntitydbEntityBase<LastUpdate> {
    constructor(client: ShodanEntitydbSDK, entopts: any);
    make(this: LastUpdateEntity): LastUpdateEntity;
    load(this: any, reqmatch?: LastUpdateLoadMatch, ctrl?: Control): Promise<LastUpdateEntity>;
}
export { LastUpdateEntity };
