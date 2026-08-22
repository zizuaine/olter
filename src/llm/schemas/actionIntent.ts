export const actionIntentSchema: Record<string, unknown> = {
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