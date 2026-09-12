import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
export declare const addContents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getContents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
interface DeleteParams extends ParamsDictionary {
    id: string;
}
export declare const deleteContents: (req: Request<DeleteParams>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=contents.controller.d.ts.map