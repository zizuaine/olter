import { Type, type Schema } from "@google/genai";

export const queryIntentSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        operation: {
            type: Type.STRING,
            enum: ["answer", "quiz", "flashcard", "summary", "none"]
        },
        target: {
            type: Type.STRING,
            enum: ["specific", "topic", "active", "none"]
        },
        contentQuery: {
            type: Type.STRING,
            nullable: true
        }
    },
    required: ["operation", "target", "contentQuery"]
};