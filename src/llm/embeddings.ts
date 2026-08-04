import { ai } from "../config/genai.js";

export const generateEmbeddings = async (chunk: string): Promise<number[]> => {
    console.log("Generating embedding");
    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: chunk,
    });
    if (!response.embeddings) {
        throw new Error("No embeddings returned.");
    }

    return response.embeddings[0]!.values ?? [];
};

