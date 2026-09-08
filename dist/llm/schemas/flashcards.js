export const flashcardsSchema = {
    type: "object",
    properties: {
        flashcards: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "answer"],
                additionalProperties: false
            },
            minItems: 2,
            maxItems: 10
        }
    },
    required: ["flashcards"],
    additionalProperties: false
};
//# sourceMappingURL=flashcards.js.map