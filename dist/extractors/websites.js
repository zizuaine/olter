import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import axios from "axios";
export const parseWebsites = async (link) => {
    const { data: html } = await axios.get(link, {
        headers: { "User-Agent": "Mozila/5.0" },
        timeout: 10000
    });
    const doc = new JSDOM(html, { url: link });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();
    if (!article) {
        throw new Error("Failed to extract article");
    }
    const extracted = {
        content: article?.textContent
            ?.replace(/\s+/g, " ")
            .trim() ?? "",
        sitename: article?.siteName ?? ""
    };
    return extracted;
};
//# sourceMappingURL=websites.js.map