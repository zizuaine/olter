import { genStructuredOutput } from "../llm/genStructuredOutput.js";
import { quizIntentPrompt } from "../llm/prompts/quizIntent.js";
import { quizIntentSchema } from "../llm/schemas/quizIntent.js";
export const detectQuizIntent = async (query, questions) => {
    const quesitonList = questions.map(q => `${q.questionNumber}.${q.question}`).join("\n");
    const context = `quiz questions:\n${quesitonList}\n\nuser message: ${query}`;
    const result = await genStructuredOutput({
        prompt: quizIntentPrompt,
        schema: quizIntentSchema
    }, context);
    return result;
};
//# sourceMappingURL=detectquizIntent.js.map