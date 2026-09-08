import { flashcardsPrompt } from "../llm/prompts/flashcards.js";
import { quizPrompt } from "../llm/prompts/quiz.js";
import { summaryPrompt } from "../llm/prompts/summary.js";
import { flashcardsSchema } from "../llm/schemas/flashcards.js";
import { quizSchema } from "../llm/schemas/quiz.js";
import { summarySchema } from "../llm/schemas/summary.js";
import { genStructuredOutput } from "../llm/genStructuredOutput.js";
import { quizModel } from "../models/quiz.js";
import { chatModel } from "../models/chat.js";
export const handleActionResponse = async (operation, content, contentIds, user, chatId) => {
    if (!content) {
        throw new Error("Content text is missing");
    }
    const operations = {
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
    const result = await genStructuredOutput(operationConfig, content);
    if (!result) {
        throw new Error(`Failed to generate ${operation}`);
    }
    if (operation === "quiz") {
        const quizResult = result;
        const quiz = await quizModel.create({
            userId: user,
            contentIds,
            questions: quizResult.questions,
        });
        const chat = await chatModel.findOne({ _id: chatId, userId: user });
        if (!chat) {
            throw new Error("could not find chat");
        }
        chat.quizId = quiz._id;
        await chat.save();
        return { quizId: quiz._id, questions: quiz.questions };
    }
    return result;
};
//# sourceMappingURL=handleActions.js.map