import { contentModel } from "../../models/contents.js";
import { semanticSearch } from "../semanticSearch.js";
import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";

export const getContentForAction = async (query: string, user: string, chat: HydratedDocument<Chat>) => {
    const { sources } = await semanticSearch(query, user);
    if (sources.length === 0) {
        return {
            response: {
                answer: "I couldn't find relevant saved content for that.",
                sources: [],
                chatId: chat._id
            }
        };
    }

    //combine all relevant files
    const combinedContent = sources
        .map(s => s.content)
        .join("\n\n---\n\n")
        .slice(0, 10000);


    const contentIds = sources.map(source => source._id);

    return { content: combinedContent, contentIds, sources };
}
