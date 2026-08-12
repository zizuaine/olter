import { Type, type Schema } from "@google/genai";

export const quizIntentSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        type: {
            type: Type.STRING,
            enum: ["answer", "question", "all_answers", "none"]
        },
        questionNumbers: {
            type: Type.ARRAY,
            items: {
                type: Type.INTEGER
            }
        }
    },
    required: ["type", "questionNumbers"]
};