import jwt from "jsonwebtoken";
import { getJwtSecret } from "../controllers/auth.controller.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        throw new ApiError(401, "UNAUTHORIZED", "Authorization header is missing");
    }
    const token = tokenHeader?.split(" ")[1];
    if (!token) {
        throw new ApiError(401, "UNAUTHORIZED", "Token is missing");
    }
    let decodedData: string | jwt.JwtPayload;
    try {
        decodedData = jwt.verify(token, getJwtSecret());
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(401, "INVALID_TOKEN", "Token could not be verified");
    }

    if (typeof decodedData === "string" || !decodedData.id) {
        throw new ApiError(401, "INVALID_TOKEN", "Invalid token payload");
    }
    req.userId = decodedData.id;
    next();

}