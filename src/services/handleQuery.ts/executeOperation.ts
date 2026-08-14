import { handleRagResponse } from "../chat.service/handleRagResponse.js";
import { handleActionResponse } from "../handleActions.js";
import type { QueryIntent } from "./queryResolver.js";
import type { HydratedDocument } from "mongoose";
import type { Chat } from "../../models/chat.js";

export const executeOperation = async (
    intent: QueryIntent,
    query: string,
    context: string,
    contentIds: string[],
    chat: HydratedDocument<Chat>,
    user: string
) => {

    const handleOperation = {
        answer: () =>
            handleRagResponse(
                query,
                user,
                context,
                chat
            ),
        quiz: () =>
            handleActionResponse(
                "quiz",
                context,
                contentIds,
                user,
                chat._id.toString(),
            ),
        flashcard: () =>
            handleActionResponse(
                "flashcard",
                context,
                contentIds,
                user,
                chat._id.toString(),
            ),
        summary: () =>
            handleActionResponse(
                "summary",
                context,
                contentIds,
                user,
                chat._id.toString(),
            )
    }

    if (intent.operation === "none") {
        return null;
    }

    const handler = handleOperation[intent.operation];

    return handler();
}