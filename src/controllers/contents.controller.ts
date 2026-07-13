import type { Request, Response } from "express";
import axios from "axios";
import { contentModel } from "../models/contents.js";
import { parseWebsites } from "../extractors/websites.js";
import { parseYoutube } from "../extractors/youtube.js";
import { parsePDF } from "../extractors/pdf.js";

export const detectType = (link: string): "link" | "pdf" | "youtube" => {
    if (link.includes("youtube.com/watch") || link.includes("youtu.be")) {
        return "youtube";
    };
    if (
        link.endsWith(".pdf") ||
        link.includes("/pdf/")
    ) {
        return "pdf";
    }
    return "link";
}
export const addContents = async (req: Request, res: Response) => {
    const { link, note, title } = req.body;

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.userId;

    try {
        if (note) {
            const noteContent = await contentModel.create({
                title,
                type: "note",
                userId: user,
                content: note
            });
            res.status(200).json({
                message: "content successfully added",
                noteContent
            });
        }

        const type = detectType(link);

        let extracted;
        if (type === "youtube") {
            extracted = await parseYoutube(link);
        } else if (type === "pdf") {
            extracted = await parsePDF(link);
        } else {
            const { data: html } = await axios.get(link, {
                headers: { "User-Agent": "Mozila/5.0" },
                timeout: 10000
            });
            extracted = await parseWebsites(html, link);
        }

        const content = await contentModel.create({
            link,
            title: extracted.title,
            type: type,
            userId: user,
            tags: [],
            content: extracted.content,
            summary: extracted.excerpt,
            sitename: extracted.sitename
        });

        res.status(200).json({
            message: "content successfully added",
            content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "content could not be added"
        })
    }

}

export const getContents = async (req: Request, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = req.userId;

    try {
        const contents = await contentModel.find({ userId: user }).populate("userId", "username")
        res.status(200).json({
            message: "contents fetched successfully",
            contents
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error"
        })
    }
}