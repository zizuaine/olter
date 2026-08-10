import { Type, type Schema } from "@google/genai";

export const quizSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    questionNumber: {
                        type: Type.INTEGER,
                    },
                    question: {
                        type: Type.STRING,
                    },
                    options: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                        },
                        minItems: "4",
                        maxItems: "4",
                    },
                },
                required: ["questionNumber", "question", "options"],
            },
            minItems: "10",
            maxItems: "10",
        },

        answers: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    questionNumber: {
                        type: Type.INTEGER,
                    },
                    correctAnswer: {
                        type: Type.STRING,
                    },
                    explanation: {
                        type: Type.STRING,
                    },
                },
                required: [
                    "questionNumber",
                    "correctAnswer",
                    "explanation",
                ],
            },
            minItems: "10",
            maxItems: "10",
        },
    },

    required: ["questions", "answers"],
};