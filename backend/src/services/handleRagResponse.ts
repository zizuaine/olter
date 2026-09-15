import { genResponse } from "../llm/genResponse.js";

export const handleRagResponse = async (query: string, user: string, context: string, contentIds: string[], chat: any) => {

    const { content } = await genResponse(query, context, chat.messages)


    chat.messages.push({
        role: "assistant",
        operation: "answer",
        content: content,
        sourceId: contentIds
    });
    await chat.save();

    return {
        message: "received response successfully",
        operation: "answer",
        content,
        chatId: chat._id
    };
}
