import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
import { contentModel } from "../models/contents.js";
import { rerank } from "../llm/rerank.js";

export const semanticSearch = async (
    query: string,
    user: string,
    brainId: string | null
) => {
    console.log("RERANK QUERY:", query);
    const queryEmbedding = await generateEmbeddings(query);

    const result = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 10,
        filter: brainId ? { brainId } : { userId: user },
        includeMetadata: true
    });

    const candidates = result.matches.filter(
        (
            match
        ): match is typeof match & {
            metadata: { text: string }
        } =>
            typeof match.metadata?.text === "string"
    );

    const documents = candidates.map(
        match => match.metadata.text
    );

    const reranked = await rerank(query, documents);

    console.log(
        reranked.map(r => ({
            rerankScore: r.relevanceScore,
            pineconeScore: candidates[r.index]?.score,
            text: documents[r.index]
        }))
    );

    const relevant = reranked.filter(
        r => r.relevanceScore > 0.22
    );

    console.log(
        "Relevant:",
        relevant.map(r => ({
            index: r.index,
            score: r.relevanceScore
        }))
    );

    if (relevant.length === 0) {
        console.log("not relevant")
        return {
            context: "",
            sources: [],
            matches: []
        };
    }
    console.log("relevant")

    const relevantMatches = relevant
        .map(r => candidates[r.index])
        .filter(
            (
                match
            ): match is (typeof candidates)[number] =>
                match !== undefined
        );

    const context = relevantMatches
        .map(match => match.metadata.text)
        .join("\n\n");

    const mongoIds = relevantMatches
        .map(match => match.metadata?.mongoId)
        .filter(
            (mongoId): mongoId is string =>
                typeof mongoId === "string"
        );

    const uniqueIds = [...new Set(mongoIds)];

    const sources = await contentModel.find({
        _id: { $in: uniqueIds }
    });

    return {
        context,
        sources,
        matches: relevantMatches
    };
};