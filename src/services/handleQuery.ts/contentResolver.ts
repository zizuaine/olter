import type { QueryIntent } from "./queryResolver.js";
import type { Chat } from "../../models/chat.js";
import type { HydratedDocument } from "mongoose";
import { semanticSearch } from "../semanticSearch.js";
import { contentModel } from "../../models/contents.js";

export const contentResolver = async (
    userDemand: QueryIntent,
    chat: HydratedDocument<Chat>,
    query: string,
    user: string
) => {
    const userQuery = userDemand.contentQuery ? userDemand.contentQuery : query;


    if (userDemand.target === "active") {
        if (!chat.activeContentIds.length) {
            throw new Error("no active document found")
        }

        const contents = await contentModel.find({
            _id: { $in: chat.activeContentIds }
        });

        if (contents.length === 0) {
            throw new Error("active content not found");
        }

        const combinedContent = contents
            .map(content => content.content)
            .filter((content): content is string => Boolean(content))
            .join("\n\n---\n\n");


        const contentIds = chat.activeContentIds.map(
            id => id.toString()
        );

        return {
            context: combinedContent,
            contentIds,
            sources: contents
        };
    };

    if (userDemand.target === "topic") {
        const { sources, context } = await semanticSearch(
            userQuery,
            user
        );

        if (sources.length === 0) {
            throw new Error("no sources found");
        }
        const contentIds = sources.map(s => s._id.toString());

        chat.activeContentIds = sources.map(s => s._id);
        await chat.save();
        return {
            context,
            contentIds,
            sources
        };
    };

    if (userDemand.target === "specific") {
        const { sources, matches } = await semanticSearch(
            userQuery,
            user
        );
        const source = sources[0];

        if (!source) {
            throw new Error("no source found");
        }
        if (!matches) {
            throw new Error("Content is empty");
        }

        const relevantChunks = matches
            .filter(match => match.metadata?.mongoId === source._id.toString())
            .map(match => match.metadata?.text)
            .filter((text): text is string => Boolean(text))
            .join("\n\n");

        const contentIds = [source._id.toString()];

        chat.activeContentIds = [source._id];
        await chat.save();

        return {
            context: relevantChunks,
            contentIds,
            sources: [source]
        };
    }

    if (userDemand.target === "none") {
        return null;
    }

    throw new Error("Unknown content target");
}
