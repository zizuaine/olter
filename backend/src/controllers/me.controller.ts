import type { Request, Response } from "express"
import { UserModel } from "../models/user.js"

export const getUser = async (req: Request, res: Response) => {
    const userId = req.userId
    try {
        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}