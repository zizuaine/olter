import type { QueryIntent } from "./queryResolver.js";
import { chatModel, type Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
import { semanticSearch } from "../semanticSearch.js";
import { contentModel, type Content } from "../../models/contents.js";
import { pineconeIndex } from "../../config/pinecone.js";

type ResolvedContent = {
    context?: string;
    batches?: string[][];
    contentIds: string[];
    sources?: Content[];
    content?: string;
};

export const contentResolver = async (
    intent: QueryIntent,
    chat: HydratedDocument<Chat>,
    query: string,
    user: string,
): Promise<ResolvedContent | null> => {

    const userQuery = query;

    if (intent.target === "active") {
        if (intent.scope === "relevant") {
            if (!chat.activeChunksIds.length) {
                throw new Error("no active document found")
            }
            console.log("activeChunkIds:", chat.activeChunksIds)
            const records = await pineconeIndex.fetch(
                { ids: chat.activeChunksIds }
            );
            const combinedContent = Object.values(records.records)
                .map(rec => rec.metadata?.text)
                .filter((text): text is string => Boolean(text))
                .join("\n\n---\n\n");


            const contentIds = chat.activeContentIds.map(
                id => id.toString()
            );

            return {
                context: combinedContent,
                contentIds,
            };
        }
        //for Summary
        if (intent.scope === "full") {
            const content = await contentModel.find({
                _id: { $in: chat.activeContentIds }
            });

            const chunkIds = content.flatMap(content => content.chunkIds);

            if (!chunkIds.length) {
                throw new Error("no chunks found");
            }

            const records = await pineconeIndex.fetch(
                { ids: chunkIds });

            const chunks = Object.values(records.records)
                .map(record => record.metadata?.text)
                .filter(
                    (text): text is string => Boolean(text)
                );

            let batchSize = 5;
            const batches: string[][] = [];
            for (let i = 0; i < chunks.length; i += batchSize) {
                batches.push(chunks.slice(i, i + batchSize))
            }
            return {
                batches,
                contentIds: chat.activeContentIds.map(
                    id => id.toString()
                )
            };
        }
    };

    const brainId = chat.brainId?.toString() ?? null;

    if (intent.target === "topic") {
        const { sources, context, matches } = await semanticSearch(
            userQuery,
            user,
            brainId
        );

        if (!sources || sources.length === 0) {
            return null;
        }

        const contentIds = sources.map(s => s._id.toString());

        chat.activeContentIds = sources.map(s => s._id);
        chat.activeChunksIds = matches.map(match => match.id);

        await chat.save();
        return {
            context,
            contentIds,
            sources,
        };
    };

    if (intent.target === "specific") {
        const { sources, matches } = await semanticSearch(
            userQuery,
            user,
            brainId
        );

        if (!sources || sources.length === 0) {
            return null;
        }
        const source = sources[0];
        if (source) {
            const relevantChunks = matches
                .filter(match => match.metadata?.mongoId === source?._id.toString())
                .map(match => match.metadata?.text)
                .filter((text): text is string => Boolean(text))
                .join("\n\n");

            const contentIds = [source?._id.toString()];

            chat.activeContentIds = [source._id];
            chat.activeChunksIds = matches.map(match => match.id);
            await chat.save();

            return {
                context: relevantChunks,
                contentIds,
                sources: [source]
            };
        }
    }

    if (intent.target === "none") {
        return null;
    }

    throw new Error("Unknown content target");
}
