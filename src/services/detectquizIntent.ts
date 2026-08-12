import { genStructuredOutput } from "../llm/genStructuredOutput.js";
import { quizIntentPrompt } from "../llm/prompts/quizIntent.js";
import { quizIntentSchema } from "../llm/schemas/quizIntent.js";

type QuizIntent = {
    type: "answer" | "question" | "all_answers" | "none";
    questionNumbers: number[];
};

export const detectQuizIntent = async (
    query: string
): Promise<QuizIntent> => {

    const result = await genStructuredOutput<QuizIntent>(
        {
            prompt: quizIntentPrompt,
            schema: quizIntentSchema
        },
        query
    );

    return result.text;
};