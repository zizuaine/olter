import { contentModel } from "../models/contents.js";
import { parseWebsites } from "../extractors/websites.js";
import { parseYoutube } from "../extractors/youtube.js";
import { parsePDF } from "../extractors/pdf.js";
import type { ExtractedContent } from "../types/extracted-content.js";
import { chunker } from "../utils/chunking.js";
import { generateEmbeddings } from "../utils/embeddings.js";


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
        const noteContent = await contentModel.create({
            title: title ?? "",
            type: "note",
            userId: user,
            content: note
        });
        const chunks = chunker(note);

        return noteContent;
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

    const chunks = chunker(extracted.content);
    if (!chunks) {
        throw new Error("chunks not received")
    }

    const generatedEmbed = await generateEmbeddings(chunks)

    const content = await contentModel.create({
        link,
        title: extracted.title,
        type: type,
        userId: user,
        tags: [],
        content: extracted.content,
        summary: extracted.excerpt,
        sitename: extracted.sitename
    });

    return content;


}