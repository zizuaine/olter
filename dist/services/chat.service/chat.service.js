import { chatModel } from "../../models/chat.js";
import { handleQuery } from "./handleQuery.js";
import { handleQuizResponse } from "./quiz.service.js";
import { executeOperation } from "../handleQuery.ts/executeOperation.js";
const nonContentAnswer = "Hi! I'm Olter. Ask me about something you've saved, or tell me what you want to do with your notes.";
export const sendQueryService = async (query, chatId, user) => {
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
    if (intent.operation === "none" || intent.target === "none") {
        chat.messages.push({
            role: "assistant",
            content: nonContentAnswer,
            sourceId: []
        });
        await chat.save();
        return {
            status: 200,
            body: {
                message: "received response successfully",
                answer: nonContentAnswer,
                sources: [],
                chatId: chat._id.toString(),
            },
        };
    }
    if (!resolvedContent) {
        throw new Error("no content returned by contentResolver");
    }
    const ragResponse = await executeOperation(intent, query, resolvedContent, chat, user);
    return {
        status: 200,
        body: {
            ...ragResponse,
            chatId: chat._id.toString(),
            sources: resolvedContent.sources,
        },
    };
};
export const getExistingChatService = async (chatId, user) => {
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user
    }).populate("messages.sourceId");
    return chat;
};
export const getAllChatsService = async (user) => {
    const chats = await chatModel.find({ userId: user });
    return chats;
};
export const deleteChatService = async (chatId, user) => {
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: user
    });
    if (!chat) {
        return null;
    }
    ;
    await chat.deleteOne();
    return chat;
};
//# sourceMappingURL=chat.service.js.map