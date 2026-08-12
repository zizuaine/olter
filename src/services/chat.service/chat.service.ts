import { chatModel } from "../../models/chat.js";
import { handleActionResponse } from "./action.service.js";
import { handleQuizResponse } from "./quiz.service.js";
import { handleRagResponse } from "./rag.service.js";

export const sendQueryService = async (query: string, chatId: string, user: string) => {
    //check if existing chat exists
    let chat;
    if (!chatId) {
        chat = await chatModel.create({
            userId: user,
            title: query.slice(0, 50),
            messages: [{ role: "user", content: query }]
        });
    } else {
        chat = await chatModel.findOne({
            _id: chatId,
            userId: user
        });

        if (!chat) {
            return {
                status: 404,
                body: {
                    message: "Chat not found"
                }
            };
        }
        chat.messages.push({ role: "user", content: query });
        await chat.save();


        //check if exisitng chat has an active quiz
        const quizResponse = await handleQuizResponse(query, chat);
        if (quizResponse) {
            return {
                status: 200,
                body: quizResponse
            };
        }
    }

    const actionResponse = await handleActionResponse(query, user, chat);
    if (actionResponse) {
        return {
            status: 200,
            body: actionResponse
        };
    }

    const ragResponse = await handleRagResponse(query, user, chat);

    return {
        status: 200,
        body: ragResponse
    };
}

export const getExistingChatService = async (chatId: string, user: string) => {
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user
    });

    return chat;
}

export const getAllChatsService = async (user: string) => {
    const chats = await chatModel.find({ userId: user })

    return chats;
}

export const deleteChatService = async (chatId: string, user: string) => {
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user
    });

    if (!chat) {
        return null;
    };

    await chat.deleteOne()

    return chat;
}
