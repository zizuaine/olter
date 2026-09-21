import { genResponse } from "../llm/genResponse.js";

type RagResponse = {
    message: string;
    operation: "answer";
    content: string;
    found: boolean;
    chatId: string;
};

export const handleRagResponse = async (query: string, user: string, context: string, contentIds: string[], chat: any): Promise<RagResponse> => {

    const ragResponse = await genResponse(query, context, chat.messages)


    chat.messages.push({
        role: "assistant",
        operation: "answer",
        content: ragResponse.answer,
        sourceId: ragResponse.found ? contentIds : []
    });
    await chat.save();

    return {
        message: "received response successfully",
        operation: "answer",
        content: ragResponse.answer,
        found: ragResponse.found,
        chatId: chat._id.toString(),
    };
}
