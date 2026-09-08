import { genResponse } from "../llm/genResponse.js";
export const handleRagResponse = async (query, user, context, chat) => {
    const { answer } = await genResponse(query, context, chat.messages);
    chat.messages.push({ role: "assistant", content: answer });
    await chat.save();
    return {
        message: "received response successfully",
        answer,
        chatId: chat._id
    };
};
//# sourceMappingURL=handleRagResponse.js.map