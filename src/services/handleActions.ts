import { flashcardsPrompt } from "../llm/prompts/flashcards.js";
import { quizPrompt } from "../llm/prompts/quiz.js";
import { summaryPrompt } from "../llm/prompts/summary.js";
import { flashcardsSchema } from "../llm/schemas/flashcards.js";
import { quizSchema } from "../llm/schemas/quiz.js";
import { summarySchema } from "../llm/schemas/summary.js";
import { genStructuredOutput } from "../llm/genStructuredOutput.js";
import { quizModel } from "../models/quiz.js";
import type { Content } from "../models/contents.js";
import { chatModel } from "../models/chat.js";


type QuizResult = {
    questions: {
        questionNumber: number;
        question: string;
        options: string[];
    }[];
    answers: {
        questionNumber: number;
        correctAnswer: string;
        explanation: string;
    }[];
};

type SummaryResult = {
    summary: string;
};

type FlashcardResult = {
    question: string;
    answer: string;
}[];

type OperationMap = {
    flashcard: FlashcardResult,
    quiz: QuizResult,
    summary: SummaryResult
}

type Operation = "flashcard" | "quiz" | "summary";

export const handleActionResponse = async (
    operation: Operation,
    content: string,
    contentIds: string[],
    user: string,
    chatId: string
) => {

    if (!content) {
        throw new Error("Content text is missing");
    }

    const operations =
    {
        flashcard: {
            prompt: flashcardsPrompt,
            schema: flashcardsSchema
        },
        quiz: {
            prompt: quizPrompt,
            schema: quizSchema
        },
        summary: {
            prompt: summaryPrompt,
            schema: summarySchema
        }
    };

    const operationConfig = operations[operation];
    const result = await genStructuredOutput<OperationMap[typeof operation]>(
        operationConfig,
        content
    );

    if (!result) {
        throw new Error(`Failed to generate ${operation}`);
    }

    if (operation === "quiz") {
        const quizResult = result as QuizResult;
        const quiz = await quizModel.create({
            userId: user,
            contentIds,
            questions: quizResult.questions,
            answers: quizResult.answers,
        });
        const chat = await chatModel.findOne({ _id: chatId, userId: user });
        if (!chat) {
            throw new Error("could not find chat")
        }
        chat.quizId = quiz._id;
        await chat.save();
        return { quizId: quiz._id, questions: quiz.questions };
    }

    return result;
}