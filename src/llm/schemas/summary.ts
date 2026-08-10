import { Type, type Schema } from "@google/genai";

export const summarySchema: Schema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
        },
    },
    required: ["summary"],
};