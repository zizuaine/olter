import { Type, type Schema } from "@google/genai";

export const flashcardsSchema: Schema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
            },
            answer: {
                type: Type.STRING,
            },
        },
        required: ["question", "answer"],
    },
    minItems: "10",
    maxItems: "10",
};