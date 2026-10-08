import { URL } from "node:url";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import type { ExtractedContent } from "../types/extracted-content.js";
import { UrlValidator } from "../security/validateUrl.js";
import { ApiError } from "../utils/ApiError.js";

export const parseYoutube = async (link: string): Promise<ExtractedContent> => {
    let url: URL;
    try {
        url = new URL(link);
    } catch {
        throw new ApiError(400, "INVALID_URL", "Invalid URL");
    }
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname !== "youtube.com" && hostname !== "youtu.be") {
        throw new ApiError(400, "INVALID_URL", "Invalid YouTube URL");
    }

    let id: string;
    if (hostname === "youtube.com") {
        id = url.searchParams.get("v") ?? "";
        if (!id) {
            throw new ApiError(400, "INVALID_URL", "YouTube video ID not found");
        }
    } else if (hostname === "youtu.be") {
        id = url.pathname.slice(1);
        if (!id) {
            throw new ApiError(400, "INVALID_URL", "YouTube video ID not found");
        }
    } else {
        throw new Error("Invalid YouTube URL");
    }
    return await extract(id, link)

}

const extract = async (id: string, safeUrl: string): Promise<ExtractedContent> => {
    const response = await axios.get(
        "https://www.youtube.com/oembed",
        {
            params: {
                url: safeUrl,
                format: "json"
            },
            timeout: 10000
        }
    );

    const title = response.data.title;

    let transcriptObj;
    try {
        transcriptObj = await YoutubeTranscript.fetchTranscript(id);
    } catch {
        throw new ApiError(422, "TRANSCRIPT_NOT_FOUND", "No subtitles or captions available for this video");
    }
    const transcript = transcriptObj.map(obj => obj.text).join(" ");
    if (!transcript) {
        throw new ApiError(
            422,
            "EXTRACTION_FAILED",
            "Transcript unavailable"
        );
    }
    return {
        content: transcript,
        sitename: "Youtube",
    };
}