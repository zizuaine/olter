import { generateEmbeddings } from "../llm/embeddings.js";
import { pineconeIndex } from "../config/pinecone.js";
import { contentModel } from "../models/contents.js";
import { geminiBucket } from "../rate-limiting/tokenBucket.js";

export const saveEmbeddings = async (
    chunks: string[],
    mongoId: string,
    userId: string,
    type: string,
    brainId: string | null
) => {
    const generateRateLimitedEmbedding = async (chunk: string): Promise<number[]> => {
        await geminiBucket.consume();
        return generateEmbeddings(chunk);
    }

    const batchSize: number = 5;
    const embeddings: number[][] = []
    for (let i = 0; i < chunks.length; i += batchSize) {
        console.log(`Starting batch ${i}`);
        const batch = chunks.slice(i, i + batchSize);

        const embed = await Promise.all(
            batch.map(chunk => generateRateLimitedEmbedding(chunk))
        );
        console.log("Embeddings generated");
        embeddings.push(...embed);
    }

    const chunkIds = chunks.map(
        (c, i) => `${mongoId}_chunk_${i}`
    );
    await contentModel.findByIdAndUpdate(
        mongoId,
        { chunkIds },
    );

    const pineconeRecords = embeddings.map((embedding, i) => {
        return {
            id: `${mongoId}_chunk_${i}`,
            values: embedding,
            metadata: {
                userId,
                mongoId,
                type,
                chunkIndex: i,
                text: chunks[i] ?? "",
                ...(brainId ? { brainId: brainId.toString() } : {})
            }
        }
    });
    if (!pineconeRecords) {
        throw new Error("failed to store embeddings")
    }

    console.log("Preparing Pinecone records");
    await pineconeIndex.upsert({ records: pineconeRecords })
    console.log("Pinecone upsert complete");
}