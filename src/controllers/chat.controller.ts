import type { Request, Response } from "express";
import { semanticSearch } from "../services/semanticSearch.js";
import { chatModel } from "../models/chat.js";
import { contentModel } from "../models/contents.js";


export const sendQuery = async (req: Request, res: Response) => {

    const user = req.userId;
    const { query, chatId } = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        let chat;
        if (!chatId) {
            chat = await chatModel.create({
                userId: user,
                title: query.slice(0, 50),
                messages: [{ role: "user", content: query }]
            });
        } else {
            chat = await chatModel.findById(chatId);
            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found"
                });
            }
            chat.messages.push({ role: "user", content: query });
            await chat.save();
        }

        const { answer, sources } = await semanticSearch(query, user, chat.messages);
        chat.messages.push({ role: "assistant", content: answer });
        await chat.save();

        res.status(200).json({
            message: "received response successfully",
            answer,
            sources,
            chatId: chat._id
        });

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

    try {
        const chat = await chatModel.findOne({
            _id: chatId,
            userId: user
        });
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        };

        res.status(200).json({
            message: "received chat successfully",
            chat,
            chatId: chat._id
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
        const chats = await chatModel.find({ userId: user })
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

    try {
        const chat = await chatModel.findOne({
            _id: chatId,
            userId: user
        });
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        };
        await chat.deleteOne()

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