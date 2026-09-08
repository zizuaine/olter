export const actionIntentSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            enum: ["quiz", "flashcard", "summary", "none"]
        }
    },
    required: ["type"],
    additionalProperties: false
};
//# sourceMappingURL=actionIntent.js.map