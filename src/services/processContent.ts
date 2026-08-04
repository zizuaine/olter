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
    link?: string,
    title?: string,
    note?: string,
) => {

    if (note) {
        try {
            const noteContent = await contentModel.create({
                title: title ?? "",
                type: "note",
                userId: user,
                content: note,
                embeddingStatus: "pending"
            });
            embedInBackground(noteContent._id.toString(), note, user, "note")
                .catch(error => console.error("Background embedding failed", error))
            return noteContent;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to save content");
        }
    }

    if (!link) {
        throw new Error("Link is required.")
    }

    const type = detectType(link);

    let extracted: ExtractedContent;
    if (type === "youtube") {
        extracted = await parseYoutube(link);
    } else if (type === "pdf") {
        extracted = await parsePDF(link);
    } else {

        extracted = await parseWebsites(link);
    }

    const metadata = await generateMetadata(extracted.content)

    try {
        const content = await contentModel.create({
            link,
            title: metadata.title,
            type: type,
            userId: user,
            tags: [],
            topics: metadata.topics,
            content: extracted.content,
            summary: metadata.summary,
            sitename: extracted.sitename,
            embeddingStatus: "pending"
        });
        embedInBackground(content._id.toString(), extracted.content, user, type)
            .catch(error => console.error("Background embedding failed", error))
        return content;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to save content");
    }
}
