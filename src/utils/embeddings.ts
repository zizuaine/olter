import { ai } from "../config/genai.js";

const embeddings = async (chunk: string): Promise<number[]> => {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: chunk,
    });
    if (!response.embeddings) {
        throw new Error("No embeddings returned.");
    }

    return response.embeddings[0]?.values ?? [];
};
