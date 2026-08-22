export const quizSchema: Record<string, unknown> = {
    type: "object",
    properties: {
        questions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    questionNumber: { type: "integer" },
                    question: { type: "string" },
                    options: {
                        type: "array",
                        items: { type: "string" },
                        minItems: 4,
                        maxItems: 4
                    }
                },
                required: ["questionNumber", "question", "options"],
                additionalProperties: false
            },
            minItems: 2,
            maxItems: 10
        },
        answers: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    questionNumber: { type: "integer" },
                    correctAnswer: { type: "string" },
                    explanation: { type: "string" }
                },
                required: ["questionNumber", "correctAnswer", "explanation"],
                additionalProperties: false
            },
            minItems: 2,
            maxItems: 10
        }
    },
    required: ["questions", "answers"],
    additionalProperties: false
};