import { genResponse } from "../../llm/genResponse.js";
import type { contentModel } from "../../models/contents.js";
import { quizModel } from "../../models/quiz.js";
import { detectQuizIntent } from "../detectquizIntent.js";

export const handleQuizResponse = async (query: string, chat: any) => {

    if (chat.quizId) {

        const quiz = await quizModel.findById(chat.quizId);

        if (!quiz) {
            throw new Error("quiz not found");
        }

        const intent = await detectQuizIntent(query, quiz.questions);

        if (intent.type !== 'none') {

            let quizContext;

            if (intent.type === 'answer') {
                const results = quiz.questions.filter(q =>
                    intent.questionNumbers.includes(q.questionNumber)
                );
                quizContext = JSON.stringify({ questions: results });

            } else if (intent.type === 'all_answers') {
                quizContext = JSON.stringify({ questions: quiz.questions });

            } else if (intent.type === 'question') {
                const results = quiz.questions
                    .filter(q => intent.questionNumbers.includes(q.questionNumber))
                    .map(q => ({
                        questionNumber: q.questionNumber,
                        question: q.question,
                        options: q.options
                    }));
                quizContext = JSON.stringify({ questions: results });
            }

            if (!quizContext) {
                throw new Error("quiz not found");
            }

            const LLMresponse = await genResponse(query, quizContext, chat.messages);
            chat.messages.push({ role: "assistant", content: LLMresponse.content });
            await chat.save();

            return {
                message: "received response successfully",
                content: LLMresponse.content,
                sources: [],
                chatId: chat._id.toString(),
                operation: "quiz"
            };
        }
    }

    return null;
}