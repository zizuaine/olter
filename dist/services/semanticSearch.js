import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
import { contentModel } from "../models/contents.js";
export const semanticSearch = async (query, user, brainId) => {
    const queryEmbedding = await generateEmbeddings(query);
    const result = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 5,
        filter: brainId ? { brainId } : { userId: user },
        includeMetadata: true
    });
    if (result.matches.length === 0) {
        return {
            context: "",
            sources: []
        };
    }
    const context = result.matches.map(match => match.metadata?.text)
        .filter((text) => typeof text === "string").join("\n\n");
    const mongoIds = result.matches.map(match => match.metadata?.mongoId)
        .filter((mongoId) => typeof mongoId === "string");
    const uniqueIds = [...new Set(mongoIds)];
    const sources = await contentModel.find({
        _id: { $in: uniqueIds }
    });
    return { context, sources, matches: result.matches };
};
//# sourceMappingURL=semanticSearch.js.map