import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
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
            context: "",
            sources: []
        }
    }

    const context = result.matches.map(match => match.metadata?.text)
        .filter((text): text is string => typeof text === "string").join("\n\n");

    const mongoIds = result.matches.map(match => match.metadata?.mongoId)
        .filter((mongoId): mongoId is string => typeof mongoId === "string");

    const uniqueIds = [...new Set(mongoIds)];

    const sources = await contentModel.find({
        _id: { $in: uniqueIds }
    });

    return { context, sources, matches: result.matches };
}