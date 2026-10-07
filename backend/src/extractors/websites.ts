import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { ExtractedContent } from "../types/extracted-content.js";
import axios from "axios";
import net from "node:net";
import { ApiError } from "../utils/ApiError.js";
import { UrlValidator } from "../security/validateUrl.js";

export const parseWebsites = async (link: string): Promise<ExtractedContent> => {

    const { url, safeIp } = await UrlValidator(link);

    const family = net.isIP(safeIp);
    if (!family) {
        throw new ApiError(400, "INVALID", "Invalid validated IP")
    }
    const { data: html } = await axios.get(url, {
        maxRedirects: 0,
        maxContentLength: 5 * 1024 * 1024,
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 10000,

        lookup: (_hostname, options: any, callback: any) => {
            if (options?.all) {
                callback(null, [{ address: safeIp, family }] as any);
            } else {
                callback(null, safeIp, family);
            }
        }

    });
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
        throw new ApiError(
            422,
            "EXTRACTION_FAILED",
            "Failed to extract article"
        );
    }

    const extracted = {
        content: article.textContent
            ?.replace(/\s+/g, " ")
            .trim() ?? "",
        sitename: article?.siteName ?? ""
    }
    return extracted;
}