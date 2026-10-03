import type { Request, Response } from "express";
import { processContent } from "../services/processContent.js";
import { contentModel } from "../models/contents.js";
import { deleteContentsService } from "../services/deleteContent.js";
import type { ParamsDictionary } from "express-serve-static-core";
import { ApiError } from "../utils/ApiError.js";



export const addContents = async (req: Request, res: Response) => {
    const { link, note, title, brainId } = req.body;

    const user = req.userId;
    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const content = await processContent(user, brainId ?? null, link, title, note);
    res.status(200).json({
        message: "content successfully added",
        content
    });

}

export const getContents = async (req: Request, res: Response) => {
    const brainId = req.query.brainId as string | null;
    const user = req.userId;
    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const contents = await contentModel
        .find({
            userId: user,
            brainId: brainId === "null" ? null : brainId
        })
        .select("type title link tags topics userId summary sitename embeddingStatus createdAt")
        .sort({ createdAt: -1 })
        .populate("userId", "username");
    res.status(200).json({
        message: "contents fetched successfully",
        contents
    })
}

export const getContent = async (req: Request, res: Response) => {
    const user = req.userId;
    const { id } = req.params;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const content = await contentModel
        .findOne({
            _id: id,
            userId: user
        })
        .populate("userId", "username");

    if (!content) {
        throw new ApiError(404, "CONTENT_NOT_FOUND", "Content not found");
    }

    res.status(200).json({
        message: "content fetched successfully",
        content
    });
};

interface DeleteParams extends ParamsDictionary {
    id: string;
}

export const deleteContents = async (req: Request<DeleteParams>, res: Response) => {
    const user = req.userId;
    const { id } = req.params;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const deletedContent = await deleteContentsService(user, id);

    if (!deletedContent) {
        throw new ApiError(404, "CONTENT_NOT_FOUND", "Content not found");
    }

    return res.status(200).json({
        message: "Content deleted successfully",
    });
};

export const updateContent = async (req: Request, res: Response) => {
    const user = req.userId;
    const { id } = req.params;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const { title, summary, content } = req.body;

    const updatedContent = await contentModel.findOneAndUpdate(
        {
            _id: id,
            userId: user
        },
        {
            title,
            summary,
            content
        },
        {
            new: true
        }
    ).populate("userId", "username");

    if (!updatedContent) {
        throw new ApiError(404, "CONTENT_NOT_FOUND", "Content not found");
    }

    res.status(200).json({
        message: "Content updated successfully",
        content: updatedContent
    });
};