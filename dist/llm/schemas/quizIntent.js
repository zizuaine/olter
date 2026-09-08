export const quizIntentSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            enum: ["answer", "question", "all_answers", "none"]
        },
        questionNumbers: {
            type: "array",
            items: { type: "integer" }
        }
    },
    required: ["type", "questionNumbers"],
    additionalProperties: false
};
//# sourceMappingURL=quizIntent.js.map