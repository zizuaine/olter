import { genResponse } from "../llm/genResponse.js";

export const handleRagResponse = async (query: string, user: string, context: string, contentIds: string[], chat: any) => {

    const { answer } = await genResponse(query, context, chat.messages)


    chat.messages.push({
        role: "assistant",
        operation: "answer",
        content: answer,
        sourceId: contentIds
    });
    await chat.save();

    return {
        message: "received response successfully",
        operation: "answer",
        answer,
        chatId: chat._id
    };
}
