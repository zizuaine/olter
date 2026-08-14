import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
import { queryIntentPrompt } from "../../llm/prompts/queryIntent.js";
import { queryIntentSchema } from "../../llm/schemas/queryIntent.js";
import { genStructuredOutput } from "../../llm/genStructuredOutput.js";

export type QueryIntent = {
    operation: "answer" | "quiz" | "flashcard" | "summary" | "none";
    target: "specific" | "topic" | "active" | "none";
    contentQuery: string | null;
};

const queryIntentConfig = {
    prompt: queryIntentPrompt,
    schema: queryIntentSchema
};

export const queryResolver = async (query: string, chat: HydratedDocument<Chat>) => {
    const history = chat.messages.slice(-10).map(message => (
        `${message.role} - ${message.content}`
    ));
    const context = [
        ...history,
        `user - ${query}`
    ].join("\n");

    return genStructuredOutput<QueryIntent>(
        queryIntentConfig,
        context
    );
}