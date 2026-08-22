import { groq } from "../config/groq.js";
import { metadataSchema } from "./schemas/metadataSchema.js"; // must be standard JSON Schema now

export interface Metadata {
    title: string;
    summary: string;
    tags: string[];
    topics: string[];
}

export const generateMetadata = async (content: string): Promise<Metadata> => {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: `
        Analyze the following content.
        Content:${content.slice(0, 5000)}

        Instructions:
        - Generate a descriptive title.
        - Generate exactly 3 tags.
        - Generate exactly 2 topics.
        - Follow the provided JSON schema.
        - Generate exactly one summary sentence (maximum 25 words).
        `
            }
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "metadata",
                schema: metadataSchema,
                strict: true
            }
        }
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
        throw new Error("could not find text");
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error("Groq returned invalid JSON.");
    }
}