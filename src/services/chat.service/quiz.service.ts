import { genResponse } from "../../llm/genResponse.js";
import { quizModel } from "../../models/quiz.js";
import { detectQuizIntent } from "../detectquizIntent.js";

export const handleQuizResponse = async (query: string, chat: any) => {
    if (chat.quizId) {

        const quiz = await quizModel.findById(chat.quizId);

        if (!quiz) {
            throw new Error("quiz not found")
        };

        const intent = await detectQuizIntent(query, quiz.questions);

        if (intent.type !== 'none') {
            let quizContext

            if (intent.type === 'answer') {
                const questions = quiz.questions.filter(q =>
                    intent.questionNumbers.includes(q.questionNumber)
                );
                const answers = quiz.answers.filter(a =>
                    intent.questionNumbers.includes(a.questionNumber)
                );
                quizContext = JSON.stringify({
                    questions,
                    answers
                });
            } else if (intent.type === 'all_answers') {
                const questions = quiz.questions;
                const answers = quiz.answers;
                quizContext = JSON.stringify({
                    questions,
                    answers
                });
            } else if (intent.type === 'question') {
                const questions = quiz.questions.filter(q =>
                    intent.questionNumbers.includes(q.questionNumber)
                );
                quizContext = JSON.stringify({ questions });

            }

            if (!quizContext) {
                throw new Error("quiz not found")
            }

            //gets the answer for the quiz
            const LLMresponse = await genResponse(query, quizContext, chat.messages);
            chat.messages.push({ role: "assistant", content: LLMresponse.answer });
            await chat.save();

            return {
                message: "received response successfully",
                answer: LLMresponse.answer,
                sources: [],
                chatId: chat._id
            };

        }
    }

    return null;
}
