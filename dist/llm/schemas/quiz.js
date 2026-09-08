export const quizSchema = {
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
                    },
                    correctAnswer: { type: "string" },
                    explanation: { type: "string" }
                },
                required: ["questionNumber", "question", "options", "correctAnswer", "explanation"],
                additionalProperties: false
            },
            minItems: 2,
            maxItems: 10
        }
    },
    required: ["questions"],
    additionalProperties: false
};
//# sourceMappingURL=quiz.js.map