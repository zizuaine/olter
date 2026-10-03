import type { Request, Response } from "express";
import {
    sendQueryService,
    getExistingChatService,
    getAllChatsService,
    deleteChatService
} from "../services/chat.service/chat.service.js";
import { brainModel } from "../models/brain.js";
import { chatModel } from "../models/chat.js";
import { ApiError } from "../utils/ApiError.js";

export const createChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const { query, brainId } = req.body;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    };

    const chat = await chatModel.create({
        userId: user,
        title: query.slice(0, 50),
        brainId: brainId ?? null
    })
    return res.status(201).json({
        chatId: chat._id.toString()
    });
}

export const sendQuery = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;
    const { query } = req.body;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    if (!chatId) {
        throw new ApiError(400, "CHAT_ID_REQUIRED", "Chat ID is required");
    }
    const result = await sendQueryService(query, chatId.toString(), user);
    return res.status(result.status).json(result.body);
}

export const getExistingChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;

    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }
    if (typeof chatId !== "string") {
        throw new ApiError(400, "INVALID_CHAT_ID", "Invalid chat id");
    }

    const chat = await getExistingChatService(chatId, user);
    if (!chat) {
        throw new ApiError(404, "CHAT_NOT_FOUND", "Chat not found");
    };

    res.status(200).json({
        message: "received chat successfully",
        chat,
    });
}

export const getAllChats = async (req: Request, res: Response) => {
    const user = req.userId
    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const chats = await getAllChatsService(user);
    res.status(200).json({
        message: "received chats successfully",
        chats
    });
}

export const deleteChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;
    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    };
    if (typeof chatId !== "string") {
        throw new ApiError(400, "INVALID_CHAT_ID", "Invalid chat id");
    }

    const chat = await deleteChatService(chatId, user);
    if (!chat) {
        throw new ApiError(404, "CHAT_NOT_FOUND", "Chat not found");
    };

    res.status(200).json({
        message: "Chat deleted successfully",
    });
}
