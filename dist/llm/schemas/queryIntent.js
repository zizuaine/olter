export const queryIntentSchema = {
    type: "object",
    properties: {
        operation: {
            type: "string",
            enum: ["answer", "quiz", "flashcard", "summary", "none"]
        },
        target: {
            type: "string",
            enum: ["specific", "topic", "active", "none"]
        },
        scope: {
            type: "string",
            enum: ["relevant", "full", "none"]
        },
        contentQuery: {
            type: ["string", "null"]
        }
    },
    required: ["operation", "target", "scope", "contentQuery"],
    additionalProperties: false
};
//# sourceMappingURL=queryIntent.js.map