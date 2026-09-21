import { chatModel } from "../../models/chat.js";
import { handleQuery } from "./handleQuery.js";
import { handleQuizResponse } from "./quiz.service.js";
import { executeOperation } from "../handleQuery.ts/executeOperation.js";

const nonContentAnswer =
    "Hi! I'm Olter. Ask me about something you've saved, or tell me what you want to do with your notes.";

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

    if (intent.operation === "none" || intent.target === "none" || !resolvedContent) {
        const noResultsMessage = !resolvedContent
            ? "I couldn't find anything related to that in your saved content."
            : nonContentAnswer;

        chat.messages.push({
            role: "assistant",
            operation: "none",
            content: noResultsMessage,
            sourceId: []
        });
        await chat.save();

        return {
            status: 200,
            body: {
                operation: "none",
                content: noResultsMessage,
                sources: [],
                chatId: chat._id.toString()
            }
        };
    }

    const ragResponse = await executeOperation(
        intent,
        query,
        resolvedContent,
        chat,
        user
    );

    const sources = ragResponse.operation === "answer" && !ragResponse.found
        ? []
        : resolvedContent.sources ?? [];


    return {
        status: 200,
        body: {
            ...ragResponse,
            chatId: chat._id.toString(),
            sources,
            operation: intent.operation
        },
    };

}
export const getExistingChatService = async (chatId: string, user: string) => {

    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user
    }).populate("messages.sourceId");

    return chat;
}

export const getAllChatsService = async (user: string) => {
    const chats = await chatModel
        .find({ userId: user })
        .sort({ createdAt: -1 })

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
