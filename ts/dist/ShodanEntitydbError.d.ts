import { Context } from './Context';
declare class ShodanEntitydbError extends Error {
    isShodanEntitydbError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ShodanEntitydbError };
