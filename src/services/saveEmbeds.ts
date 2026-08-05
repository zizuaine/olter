import { generateEmbeddings } from "../llm/embeddings.js";
import { pineconeIndex } from "../config/pinecone.js";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const saveEmbeddings = async (
    chunks: string[],
    mongoId: string,
    userId: string,
    type: string
) => {
    const batchSize: number = 5;
    const embeddings: number[][] = []
    for (let i = 0; i < chunks.length; i += batchSize) {
        console.log(`Starting batch ${i}`);
        const batch = chunks.slice(i, i + batchSize);

        const embed = await Promise.all(
            batch.map(chunk => generateEmbeddings(chunk))
        );
        console.log("Embeddings generated");
        embeddings.push(...embed)

        if (i + batchSize < chunks.length) {
            await sleep(5000);
        }
    }

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

    console.log("Preparing Pinecone records");
    await pineconeIndex.upsert({ records: pineconeRecords })
    console.log("Pinecone upsert complete");
}