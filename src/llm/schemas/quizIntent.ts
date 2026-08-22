export const quizIntentSchema: Record<string, unknown> = {
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