import { URL } from "node:url";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import type { ExtractedContent } from "../types/extracted-content.js";

export const parseYoutube = async (link: string): Promise<ExtractedContent> => {
    const url = new URL(link);
    const hostname = url.hostname.replace(/^www\./, "");

    let id: string;
    if (hostname === "youtube.com") {
        id = url.searchParams.get("v") ?? " ";
        if (!id) {
            throw new Error("ID not found")
        }
    } else if (hostname === "youtu.be") {
        id = url.pathname.slice(1);
        if (!id) {
            throw new Error("ID not found");
        }
    } else {
        throw new Error("Invalid YouTube URL");
    }
    return await extract(id, link)

}

const extract = async (id: string, link: string): Promise<ExtractedContent> => {
    const oembedRes = await axios.get(
        `https://www.youtube.com/oembed?url=${link}&format=json`
    );
    const title = oembedRes.data.title;

    const transcript_obj = await YoutubeTranscript.fetchTranscript(id);
    const transcript = transcript_obj.map(obj => obj.text).join(" ");
    if (!transcript) {
        throw new Error("Transcript unavailable.");
    }
    return {
        title: title,
        content: transcript,
        sitename: "Youtube",
        excerpt: transcript.slice(0, 200)
    };
}