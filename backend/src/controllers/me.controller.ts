import type { Request, Response } from "express"
import { UserModel } from "../models/user.js"
import { ApiError } from "../utils/ApiError.js"

export const getUser = async (req: Request, res: Response) => {
    const userId = req.userId
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    return res.status(200).json({
        user
    });
}