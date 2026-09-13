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
        correctAnswer: string;
        explanation: string;
    }[];
};

export type SummaryResult = {
    summary: string;
};

type FlashcardResult = {
    flashcards: {
        question: string;
        answer: string;
    }[];
};

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
        });
        const chat = await chatModel.findOne({ _id: chatId, userId: user });
        if (!chat) {
            throw new Error("could not find chat")
        }
        chat.quizId = quiz._id;
        chat.messages.push({
            role: "assistant",
            operation: "quiz",
            quizId: quiz._id,
            questions: quizResult.questions,
            sourceId: contentIds
        });
        await chat.save();
        return {
            operation: "quiz",
            quizId: quiz._id,
            questions: quiz.questions
        };
    }

    if (operation === "flashcard") {
        const flashcardResult = result as FlashcardResult;
        const chat = await chatModel.findOne({ _id: chatId, userId: user });
        if (!chat) {
            throw new Error("could not find chat")
        }

        chat.messages.push({
            role: "assistant",
            operation: "flashcard",
            flashcards: flashcardResult.flashcards,
            sourceId: contentIds
        });
        await chat.save();

        return {
            operation: "flashcard",
            flashcards: flashcardResult.flashcards
        };
    }

    const summaryResult = result as SummaryResult;
    const chat = await chatModel.findOne({ _id: chatId, userId: user });
    if (!chat) {
        throw new Error("could not find chat")
    }

    chat.messages.push({
        role: "assistant",
        operation: "summary",
        content: summaryResult.summary,
        sourceId: contentIds
    });
    await chat.save();

    return {
        operation: "summary",
        content: summaryResult.summary,
    };
}
