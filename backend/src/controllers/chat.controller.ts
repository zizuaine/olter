import type { Request, Response } from "express";
import {
    sendQueryService,
    getExistingChatService,
    getAllChatsService,
    deleteChatService
} from "../services/chat.service/chat.service.js";
import { brainModel } from "../models/brain.js";
import { chatModel } from "../models/chat.js";

export const createChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const { query, brainId } = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    try {
        const chat = await chatModel.create({
            userId: user,
            title: query.slice(0, 50),
            brainId: brainId ?? null
        })
        return res.status(201).json({
            chatId: chat._id.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get a response"
        })
    }
}

export const sendQuery = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;
    const { query } = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!chatId) {
        return res.status(400).json({
            message: "Chat ID is required"
        });
    }
    try {

        const result = await sendQueryService(query, chatId.toString(), user);

        return res.status(result.status).json(result.body);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get a response"
        })
    }
}

export const getExistingChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (typeof chatId !== "string") {
        return res.status(400).json({ message: "Invalid chat id" });
    }

    try {
        const chat = await getExistingChatService(chatId, user);
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        };

        res.status(200).json({
            message: "received chat successfully",
            chat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "System Error"
        })
    }
}

export const getAllChats = async (req: Request, res: Response) => {
    const user = req.userId
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const chats = await getAllChatsService(user);
        res.status(200).json({
            message: "received chats successfully",
            chats
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch chats"
        })
    }
}

export const deleteChat = async (req: Request, res: Response) => {
    const user = req.userId;
    const chatId = req.params.id;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    };
    if (typeof chatId !== "string") {
        return res.status(400).json({ message: "Invalid chat id" });
    }

    try {
        const chat = await deleteChatService(chatId, user);
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        };

        res.status(200).json({
            message: "Chat deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}
