import type { Request, Response } from "express";
export declare const sendQuery: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getExistingChat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllChats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteChat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chat.controller.d.ts.map