import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { ExtractedContent } from "../types/extracted-content.js";
import axios, { isAxiosError } from "axios";
import net from "node:net";
import { ApiError } from "../utils/ApiError.js";
import { UrlValidator } from "../security/validateUrl.js";

export const parseWebsites = async (link: string): Promise<ExtractedContent> => {
    const { url, safeIp } = await UrlValidator(link);

    const family = net.isIP(safeIp);
    if (!family) {
        throw new ApiError(400, "INVALID", "Invalid validated IP");
    }

    let html: string;

    try {
        const response = await axios.get<string>(url, {
            responseType: "text",
            maxRedirects: 0,
            maxContentLength: 5 * 1024 * 1024, // 5 MB ceiling
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000,
            lookup: (_hostname, options: any, callback: any) => {
                if (options?.all) {
                    callback(null, [{ address: safeIp, family }]);
                } else {
                    callback(null, safeIp, family);
                }
            }
        });

        html = response.data;
    } catch (err: unknown) {
        if (isAxiosError(err)) {
            if (err.response?.status && [301, 302, 303, 307, 308].includes(err.response.status)) {
                const redirectUrl = err.response.headers["location"];
                throw new ApiError(400, "REDIRECT_NOT_ALLOWED", `Redirects are disabled. The server tried to send you to: ${redirectUrl}`);
            }
            if (err.code === "ECONNABORTED") {
                throw new ApiError(504, "TIMEOUT", "Request to target URL timed out");
            }
            throw new ApiError(400, "FETCH_FAILED", err.message || "Failed to fetch URL content");
        }
        throw err;
    }

    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
        throw new ApiError(
            422,
            "EXTRACTION_FAILED",
            "Failed to extract readable article content"
        );
    }

    return {
        content: article.textContent?.replace(/\s+/g, " ").trim() ?? "",
        sitename: article.siteName ?? ""
    };
};