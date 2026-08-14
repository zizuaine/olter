import type { Request, Response } from "express";
import { contentModel } from "../models/contents.js";
import { aiActions } from "../services/handleActions.js"

export const aiController = async (req: Request, res: Response) => {
    const { operation, contentId, chatId } = req.body;
    const user = req.userId
    if (!user) {
        throw new Error("user not found")
    }

    try {
        const content = await contentModel.findById(contentId);
        if (!content?.content) {
            throw new Error("Content not Found")
        }
        const result = await aiActions(operation, content, user, chatId);
        res.status(200).json({
            message: "Fetched result successfully",
            result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to receive Response"
        })
    }
}