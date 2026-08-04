import { Type, type Schema } from "@google/genai";

export const metadataSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: "3",
            maxItems: "3",
        },
        topics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: "2",
            maxItems: "2",
        },
    },
};