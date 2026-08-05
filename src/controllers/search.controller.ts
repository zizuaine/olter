import type { Request, Response } from "express";
import { semanticSearch } from "../services/semanticSearch.js";

export const searchQuery = async (req: Request, res: Response) => {
    const { query } = req.body;
    const user = req.userId;

    if (!user) {
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    };

    try {
        const { answer, sources } = await semanticSearch(query, user);
        res.status(200).json({
            message: "received response successfully",
            answer,
            sources
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get a response"
        })
    }
}