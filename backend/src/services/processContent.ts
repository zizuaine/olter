import { contentModel } from "../models/contents.js";
import { parseWebsites } from "../extractors/websites.js";
import { parseYoutube } from "../extractors/youtube.js";
import { parsePDF } from "../extractors/pdf.js";
import type { ExtractedContent } from "../types/extracted-content.js";
import { embedInBackground } from "./embedInBackground.js";
import { generateMetadata } from "../llm/metadata.js";


const detectType = (link: string): "link" | "pdf" | "youtube" => {
    if (link.includes("youtube.com/watch") || link.includes("youtu.be")) {
        return "youtube";
    };
    if (
        link.endsWith(".pdf") ||
        link.includes("/pdf/")
    ) {
        return "pdf";
    }
    return "link";
}

export const processContent = async (
    user: string,
    brainId: string | null,
    link?: string,
    title?: string,
    note?: string,
    PDF?: Express.Multer.File,
) => {

    if (note) {
        try {
            const noteContent = await contentModel.create({
                title: title ?? "",
                type: "note",
                userId: user,
                content: note,
                embeddingStatus: "pending",
                brainId: brainId ?? null,
            });
            embedInBackground(
                noteContent._id.toString(),
                note,
                user,
                "note",
                brainId
            ).catch(error => console.error("Background embedding failed", error))

            const populatedContent = await contentModel.findById(noteContent._id)
                .populate("userId", "username")
            return populatedContent;

        } catch (error) {
            console.error(error);
            throw new Error("Failed to save content");
        }
    }

    if (!link && !PDF) {
        throw new Error("Link or PDF is required.");
    }

    let type: "link" | "pdf" | "youtube"
    let extracted: ExtractedContent;

    if (PDF) {
        type = "pdf";
        extracted = await parsePDF(PDF);
    }
    else {
        if (!link) throw new Error("link not provided")
        type = detectType(link);

        if (type === "youtube") {
            extracted = await parseYoutube(link);
        } else if (type === "pdf") {
            extracted = await parsePDF(link);
        } else {

            extracted = await parseWebsites(link);
        }
    }

    const metadata = await generateMetadata(extracted.content);

    try {
        const content = await contentModel.create({
            link: link ?? "",
            title: metadata.title,
            type: type,
            userId: user,
            tags: metadata.tags,
            topics: metadata.topics,
            content: extracted.content,
            summary: metadata.summary,
            sitename: extracted.sitename,
            embeddingStatus: "pending",
            brainId: brainId ?? null,
        });
        embedInBackground(content._id.toString(),
            extracted.content,
            user,
            type,
            brainId
        ).catch(error => console.error("Background embedding failed", error))

        const populatedContent = await contentModel
            .findById(content._id)
            .populate("userId", "username");

        return populatedContent;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to save content");
    }
}
