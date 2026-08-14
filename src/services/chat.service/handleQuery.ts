import { queryResolver } from "../handleQuery.ts/queryResolver.js";
import { contentResolver } from "../handleQuery.ts/contentResolver.js";
import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";

export const handleQuery = async (query: string, user: string, chat: HydratedDocument<Chat>) => {
    const intent = await queryResolver(query, chat);
    if (!intent) {
        throw new Error("intent not found")
    }
    const resolvedContent = await contentResolver(intent, chat, query, user)
    return { intent, resolvedContent };
}