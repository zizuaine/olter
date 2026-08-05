import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
import { ai } from "../config/genai.js";
import { contentModel } from "../models/contents.js";

export const semanticSearch = async (query: string, user: string) => {
    const queryEmbedding = await generateEmbeddings(query);

    const result = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 5,
        filter: { userId: user },
        includeMetadata: true
    });

    if (result.matches.length === 0) {
        return {
            answer: "I could'nt find anythin relevant",
            sources: []
        }
    }

    const context = result.matches.map(match => match.metadata?.text)
        .filter((text): text is string => typeof text === "string").join("\n\n");

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
      You are answering questions using only the provided context.

        Rules:
        - Use only the context.
        - If the answer is not present, say "I couldn't find that in your saved content."
        - Respond in plain text.
        - Do not use Markdown.
        - Keep the answer concise.

        Context:${context}

        Question:${query}
        `
    });

    const mongoIds = result.matches.map(match => match.metadata?.mongoId)
        .filter((mongoId): mongoId is string => typeof mongoId === "string");

    const uniqueIds = [...new Set(mongoIds)];

    const sources = await contentModel.find({
        _id: { $in: uniqueIds }
    });

    return { answer: response.text, sources };
}