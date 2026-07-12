import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { ExtractedContent } from "../types/extracted-content.js";

export const parseWebsites = async (html: string, link: string): Promise<ExtractedContent> => {
    const doc = new JSDOM(html, { url: link });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
        throw new Error("Failed to extract article")
    }

    const extracted = {
        title: article?.title ?? "",
        content: article?.textContent
            ?.replace(/\s+/g, " ")
            .trim()
            .slice(0, 4000) ?? "",
        excerpt: article?.excerpt ?? "",
        sitename: article?.siteName ?? ""
    }
    return extracted;
}