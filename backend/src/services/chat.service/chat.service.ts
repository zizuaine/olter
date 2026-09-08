import { chatModel } from "../../models/chat.js";
import { handleQuery } from "./handleQuery.js";
import { handleQuizResponse } from "./quiz.service.js";
import { executeOperation } from "../handleQuery.ts/executeOperation.js";

export const sendQueryService = async (
    query: string,
    chatId: string,
    user: string,
) => {
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user,

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

    //check if exisitng chat has an active quiz for answering it
    const quizResponse = await handleQuizResponse(query, chat);
    if (quizResponse) {
        return {
            status: 200,
            body: quizResponse
        };
    }


    const { intent, resolvedContent } = await handleQuery(query, user, chat);
    if (!resolvedContent) {
        throw new Error("no content returned by contentResolver")
    }

    const ragResponse = await executeOperation(
        intent,
        query,
        resolvedContent,
        chat,
        user
    );

    return {
        status: 200,
        body: {
            ...ragResponse,
            chatId: chat._id.toString(),
            sources: resolvedContent.sources,
        },
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
