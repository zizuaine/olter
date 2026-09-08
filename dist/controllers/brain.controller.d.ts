import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
interface BrainContentParams extends ParamsDictionary {
    id: string;
}
export declare const addToBrain: (req: Request<BrainContentParams>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=brain.controller.d.ts.map