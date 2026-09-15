import { cohere } from "../config/cohere.js";
type RerankResult = {
    index: number;
    relevanceScore: number;
};

export const rerank = async (query: string, documents: string[]): Promise<RerankResult[]> => {
    const res = await cohere.rerank({
        model: "rerank-v4.0-fast",
        query,
        documents,
        topN: documents.length
    })

    return res.results;
}