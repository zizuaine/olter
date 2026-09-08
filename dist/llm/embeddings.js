import { ai } from "../config/genai.js";
export const generateEmbeddings = async (chunk) => {
    console.log("Generating embedding");
    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: chunk,
    });
    console.log("Embedding received");
    if (!response.embeddings) {
        throw new Error("No embeddings returned.");
    }
    return response.embeddings[0].values ?? [];
};
//# sourceMappingURL=embeddings.js.map