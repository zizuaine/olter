import { URL } from "node:url";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import type { ExtractedContent } from "./websites.js";

const getVideoID = (link: string): string => {
    const url = new URL(link);
    if (url.hostname === "youtube") {
        const id = url.searchParams.get("v");
        if (!id) {
            throw new Error("ID not found")
        }
        return id;
    } else if (url.hostname === "youtu.be") {
        const id = url.pathname.slice(1);
        if (!id) {
            throw new Error("ID not found");
        }
        return id;
    }
    throw new Error("Invalid YouTube URL");
}

export const parseYoutube = async (id: string): Promise<ExtractedContent> => {
    const oembedRes = await axios.get(
        `https://www.youtube.com/oembed?url=${url}&format=json`
    );
    const title = oembedRes.data.title;

    const transcript_obj = await YoutubeTranscript.fetchTranscript(id);
    const transcript = transcript_obj.map(obj => obj.text).join(" ");
    if (!transcript) {
        return "";
    }
    return {
        title:
            content: transcript;
    };
}