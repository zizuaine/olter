
import { ai } from "../config/genai.js";
import { metadataSchema } from "./schemas/metadataSchema.js";
export interface Metadata {
    title: string;
    summary: string;
    tags: string[];
    topics: string[];
}

export const generateMetadata = async (content: string): Promise<Metadata> => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
        Analyze the following content.
        Content:${content.slice(0, 5000)}

        Instructions:
        - Generate a descriptive title.
        - Generate exactly 3 tags.
        - Generate exactly 2 topics.
        - Follow the provided JSON schema.
        - Generate exactly one summary sentence (maximum 25 words).
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: metadataSchema,
        },
    });

    const text = response.text;
    if (!text) {
        throw new Error("could not find text")
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error("Gemini returned invalid JSON.");
    }
}
