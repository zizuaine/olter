import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
import { queryIntentPrompt } from "../../llm/prompts/queryIntent.js";
import { queryIntentSchema } from "../../llm/schemas/queryIntent.js";
import { genStructuredOutput } from "../../llm/genStructuredOutput.js";

export type QueryIntent = {
    operation: "answer" | "quiz" | "flashcard" | "summary" | "none";
    target: "specific" | "topic" | "active" | "none";
    scope: "relevant" | "full" | "null";
    contentQuery: string | null;
};

const queryIntentConfig = {
    prompt: queryIntentPrompt,
    schema: queryIntentSchema
};

export const queryResolver = async (query: string, chat: HydratedDocument<Chat>) => {
    const context = `
Active content exists: ${chat.activeChunksIds.length > 0}

User request:
${query}
`;

    const intentResult = await genStructuredOutput<QueryIntent>(
        queryIntentConfig,
        context
    );

    if (intentResult.operation === "flashcard"
        || intentResult.operation === "quiz"
        || intentResult.operation === "answer") intentResult.scope = "relevant";
    console.log("intent:", intentResult)
    return intentResult;
}