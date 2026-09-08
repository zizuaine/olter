import type { Request, Response } from "express";
import { z } from "zod";
declare const validateUser: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, z.core.$strip>;
type userBody = z.infer<typeof validateUser>;
export declare const getJwtSecret: () => string;
export declare const signUp: (req: Request<{}, {}, userBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signIn: (req: Request<{}, {}, userBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map