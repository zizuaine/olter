import { queryIntentPrompt } from "../../llm/prompts/queryIntent.js";
import { queryIntentSchema } from "../../llm/schemas/queryIntent.js";
import { genStructuredOutput } from "../../llm/genStructuredOutput.js";
const queryIntentConfig = {
    prompt: queryIntentPrompt,
    schema: queryIntentSchema
};
export const queryResolver = async (query, chat) => {
    const context = `
Active content exists: ${chat.activeChunksIds.length > 0}

User request:
${query}
`;
    const intentResult = await genStructuredOutput(queryIntentConfig, context);
    if (intentResult.operation === "flashcard"
        || intentResult.operation === "quiz"
        || intentResult.operation === "answer")
        intentResult.scope = "relevant";
    console.log("intent:", intentResult);
    return intentResult;
};
//# sourceMappingURL=queryResolver.js.map