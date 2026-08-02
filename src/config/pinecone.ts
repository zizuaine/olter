import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.PINECONE_API_KEY) {
    throw new Error("pinecone api key not found")
}

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

if (!process.env.PINECONE_INDEX) {
    throw new Error("pinecone-index not found")
}


export const pineconeIndex = pinecone.index({ name: process.env.PINECONE_INDEX })