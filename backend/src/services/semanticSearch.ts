import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
import { contentModel } from "../models/contents.js";
import { rerank } from "../llm/rerank.js";

const NO_RESULTS_RESPONSE = {
    operation: "answer",
    content: "I couldn't find anything related to your question in your saved knowledge.",
    sources: [],
    context: "",
    matches: []
};

export const semanticSearch = async (
    query: string,
    user: string,
    brainId: string | null
) => {
    const queryEmbedding = await generateEmbeddings(query);

    const result = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 10,
        filter: brainId ? { brainId } : { userId: user },
        includeMetadata: true
    });

    const candidates = result.matches.filter(
        (match): match is typeof match & { metadata: { text: string } } =>
            typeof match.metadata?.text === "string"
    );

    if (candidates.length === 0) return NO_RESULTS_RESPONSE;

    const documents = candidates.map(match => match.metadata.text);

    const reranked = await rerank(query, documents);

    const relevantMatches = reranked
        .filter(r => r.relevanceScore > 0.3)
        .map(r => candidates[r.index])
        .filter((match): match is NonNullable<typeof match> => match !== undefined);

    if (relevantMatches.length === 0) return NO_RESULTS_RESPONSE;

    const context = relevantMatches
        .map(match => match.metadata.text)
        .join("\n\n");

    const mongoIds = [
        ...new Set(
            relevantMatches
                .map(match => match.metadata?.mongoId)
                .filter((id): id is string => typeof id === "string")
        )
    ];

    const sources = await contentModel.find({ _id: { $in: mongoIds } });

    return {
        context,
        sources,
        matches: relevantMatches
    };
};