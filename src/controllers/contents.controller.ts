import type { Request, Response } from "express";
import { processContent } from "../services/processContent.js";
import { contentModel } from "../models/contents.js";



export const addContents = async (req: Request, res: Response) => {
    const { link, note, title } = req.body;

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.userId;

    try {
        const content = await processContent(user, link, title, note);
        res.status(200).json({
            message: "content successfully added",
            content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "content could not be added"
        })
    }

}

export const getContents = async (req: Request, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = req.userId;

    try {
        const contents = await contentModel.find({ userId: user }).populate("userId", "username")
        res.status(200).json({
            message: "contents fetched successfully",
            contents
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error"
        })
    }
}