import { URL } from "node:url";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import type { ExtractedContent } from "../types/extracted-content.js";
import { UrlValidator } from "../security/validateUrl.js";
import { ApiError } from "../utils/ApiError.js";

export const parseYoutube = async (link: string): Promise<ExtractedContent> => {
    const { url: safeUrl, safeIp } = await UrlValidator(link);
    const url = new URL(safeUrl);
    const hostname = url.hostname.replace(/^www\./, "");

    if (
        hostname !== "youtube.com" &&
        hostname !== "youtu.be"
    ) {
        throw new ApiError(
            400,
            "INVALID_URL",
            "Invalid YouTube URL"
        );
    }

    let id: string;
    if (hostname === "youtube.com") {
        id = url.searchParams.get("v") ?? " ";
        if (!id) {
            throw new ApiError(
                400,
                "INVALID_URL",
                "YouTube video ID not found"
            );
        }
    } else if (hostname === "youtu.be") {
        id = url.pathname.slice(1);
        if (!id) {
            throw new ApiError(
                400,
                "INVALID_URL",
                "YouTube video ID not found"
            );
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

    const transcript_obj = await YoutubeTranscript.fetchTranscript(id);
    const transcript = transcript_obj.map(obj => obj.text).join(" ");
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