import { genStructuredOutput } from "../llm/genStructuredOutput.js";
import { quizIntentPrompt } from "../llm/prompts/quizIntent.js";
import { quizIntentSchema } from "../llm/schemas/quizIntent.js";

type QuizIntent = {
    type: "answer" | "question" | "all_answers" | "none";
    questionNumbers: number[];
};

type Questions = {
    questionNumber: number;
    question: string
}

export const detectQuizIntent = async (
    query: string,
    questions: Questions[]
): Promise<QuizIntent> => {

    const quesitonList = questions.map(q => `${q.questionNumber}.${q.question}`).join("\n");
    const context = `quiz questions:\n${quesitonList}\n\nuser message: ${query}`

    const result = await genStructuredOutput<QuizIntent>(
        {
            prompt: quizIntentPrompt,
            schema: quizIntentSchema
        },
        context
    );

    return result;
};