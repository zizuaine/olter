import { actionIntentPrompt } from "../llm/prompts/actionIntent.js";
import { actionIntentSchema } from "../llm/schemas/actionIntent.js";
import { genStructuredOutput } from "../llm/genStructuredOutput.js";

type ActionIntent = {
    type: "quiz" | "flashcard" | "summary" | "none",
}

export const actionIntent = async (
    query: string
): Promise<ActionIntent> => {
    const result = await genStructuredOutput<ActionIntent>(
        {
            prompt: actionIntentPrompt,
            schema: actionIntentSchema
        },
        query
    );

    return result;
}