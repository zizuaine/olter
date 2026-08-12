import { Type, type Schema } from "@google/genai";

export const actionIntentSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        type: {
            type: Type.STRING,
            enum: ["quiz", "flashcard", "summary", "none"]
        }
    },
    required: ["type"]
};