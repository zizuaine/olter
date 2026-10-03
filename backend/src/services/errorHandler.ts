import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            code: err.code,
            message: err.message,
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
    });
};