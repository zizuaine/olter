import { generateEmbeddings } from "../utils/embeddings.js";
import { pineconeIndex } from "../config/pinecone.js";

export const saveEmbeddings = async (
    chunks: string[],
    mongoId: string,
    userId: string,
    type: string
) => {
    const embeddings = await Promise.all(
        chunks.map(chunk => generateEmbeddings(chunk))
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
                text: chunks[i] ?? ""
            }
        }
    });

    await pineconeIndex.upsert({ records: pineconeRecords })
}