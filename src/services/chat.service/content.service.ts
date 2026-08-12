import { contentModel } from "../../models/contents.js";
import { semanticSearch } from "../semanticSearch.js";
import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";

export const getContentForAction = async (query: string, user: string, chat: HydratedDocument<Chat>) => {
    let contentId = chat.lastContentId;

    if (!contentId) {
        const { sources } = await semanticSearch(query, user, chat.messages);
        if (sources.length === 0) {
            return {
                response: {
                    answer: "I couldn't find relevant saved content for that.",
                    sources: [],
                    chatId: chat._id
                }
            };
        }
        contentId = sources[0]?._id;
        if (contentId) {
            chat.lastContentId = contentId;
            await chat.save()
        }
    }

    const content = await contentModel.findById(contentId);
    if (!content) {
        throw new Error("content not found")
    }

    return { content };
}
