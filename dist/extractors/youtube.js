import { URL } from "node:url";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
export const parseYoutube = async (link) => {
    const url = new URL(link);
    const hostname = url.hostname.replace(/^www\./, "");
    let id;
    if (hostname === "youtube.com") {
        id = url.searchParams.get("v") ?? " ";
        if (!id) {
            throw new Error("ID not found");
        }
    }
    else if (hostname === "youtu.be") {
        id = url.pathname.slice(1);
        if (!id) {
            throw new Error("ID not found");
        }
    }
    else {
        throw new Error("Invalid YouTube URL");
    }
    return await extract(id, link);
};
const extract = async (id, link) => {
    const response = await axios.get(`https://www.youtube.com/oembed?url=${link}&format=json`);
    const title = response.data.title;
    const transcript_obj = await YoutubeTranscript.fetchTranscript(id);
    const transcript = transcript_obj.map(obj => obj.text).join(" ");
    if (!transcript) {
        throw new Error("Transcript unavailable.");
    }
    return {
        content: transcript,
        sitename: "Youtube",
    };
};
//# sourceMappingURL=youtube.js.map