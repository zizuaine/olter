import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { ExtractedContent } from "../types/extracted-content.js";
import axios from "axios";

export const parseWebsites = async (link: string): Promise<ExtractedContent> => {
    const { data: html } = await axios.get(link, {
        headers: { "User-Agent": "Mozila/5.0" },
        timeout: 10000
    });
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
            .trim() ?? "",
        excerpt: article?.excerpt ?? "",
        sitename: article?.siteName ?? ""
    }
    return extracted;
}