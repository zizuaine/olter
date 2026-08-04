import { chunker } from "../utils/chunking.js"
import { saveEmbeddings } from "./saveEmbeds.js";
import { contentModel } from "../models/contents.js";

export const embedInBackground = async (
    mongoId: string,
    content: string,
    userId: string,
    type: string
): Promise<void> => {
    await contentModel.findByIdAndUpdate(
        mongoId,
        { embeddingStatus: "Processing" }
    )
    const chunks = chunker(content).slice(0, 100);
    if (!chunks) {
        throw new Error("chunks not received")
    };

    try {
        await saveEmbeddings(chunks, mongoId, userId, type);
        await contentModel.findByIdAndUpdate(
            mongoId,
            { embeddingStatus: "completed" }
        )
    } catch (error) {
        console.error("Background embedding failed", error);
        await contentModel.findByIdAndUpdate(
            mongoId,
            { embeddingStatus: "failed" }
        )
    }
}