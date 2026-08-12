import { semanticSearch } from "../semanticSearch.js";

export const handleRagResponse = async (query: string, user: string, chat: any) => {
    //Semantic Search
    const { answer, sources } = await semanticSearch(query, user, chat.messages);

    if (sources.length > 0) {
        const firstSource = sources[0]?._id;
        if (firstSource) {
            chat.lastContentId = firstSource
        }
    } else {
        throw new Error("no sources found")
    }

    chat.messages.push({ role: "assistant", content: answer });
    await chat.save();

    return {
        message: "received response successfully",
        answer,
        sources,
        chatId: chat._id
    };
}
