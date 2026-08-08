import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbeddings } from "../llm/embeddings.js";
import { contentModel } from "../models/contents.js";
import { chatModel } from "../models/chat.js";
import { genResponse } from "../llm/genResponse.js";

export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
}

export const semanticSearch = async (query: string, user: string, chat: ChatMessage[]) => {
    const queryEmbedding = await generateEmbeddings(query);


    const result = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 5,
        filter: { userId: user },
        includeMetadata: true
    });

    if (result.matches.length === 0) {
        return {
            answer: "I could'nt find anything relevant",
            sources: []
        }
    }

    const context = result.matches.map(match => match.metadata?.text)
        .filter((text): text is string => typeof text === "string").join("\n\n");

    const { answer } = await genResponse(query, context, chat)

    const mongoIds = result.matches.map(match => match.metadata?.mongoId)
        .filter((mongoId): mongoId is string => typeof mongoId === "string");

    const uniqueIds = [...new Set(mongoIds)];

    const sources = await contentModel.find({
        _id: { $in: uniqueIds }
    });

    return { answer, sources };
}