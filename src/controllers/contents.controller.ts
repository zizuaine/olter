import type { Request, Response } from "express";
import { processContent } from "../services/processContent.js";
import { contentModel } from "../models/contents.js";
import { deleteContentsService } from "../services/deleteContent.js";
import type { ParamsDictionary } from "express-serve-static-core";



export const addContents = async (req: Request, res: Response) => {
    const { link, note, title } = req.body;

    const user = req.userId;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const content = await processContent(user, null, link, title, note);
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

    const user = req.userId;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

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

interface DeleteParams extends ParamsDictionary {
    id: string;
}

export const deleteContents = async (req: Request<DeleteParams>, res: Response) => {
    const user = req.userId;
    const { id } = req.params;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const deletedContent = await deleteContentsService(user, id);

        if (!deletedContent) {
            return res.status(404).json({
                message: "Content not found",
            });
        }

        return res.status(200).json({
            message: "Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete content",
        });
    }
};
