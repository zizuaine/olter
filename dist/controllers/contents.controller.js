import { processContent } from "../services/processContent.js";
import { contentModel } from "../models/contents.js";
import { deleteContentsService } from "../services/deleteContent.js";
export const addContents = async (req, res) => {
    const { link, note, title, brainId } = req.body;
    const user = req.userId;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const content = await processContent(user, brainId ?? null, link, title, note);
        res.status(200).json({
            message: "content successfully added",
            content
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "content could not be added"
        });
    }
};
export const getContents = async (req, res) => {
    const brainId = req.query.brainId;
    const user = req.userId;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const contents = await contentModel
            .find({
            userId: user,
            brainId: brainId === "null" ? null : brainId
        })
            .select("type title link tags topics userId summary sitename embeddingStatus createdAt")
            .populate("userId", "username");
        res.status(200).json({
            message: "contents fetched successfully",
            contents
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error"
        });
    }
};
export const getContent = async (req, res) => {
    const user = req.userId;
    const { id } = req.params;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const content = await contentModel.findById(id);
        res.status(200).json({
            message: "content fetched successfully",
            content
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error"
        });
    }
};
export const deleteContents = async (req, res) => {
    const user = req.userId;
    const { id } = req.params;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const deletedContent = await deleteContentsService(user, id);
        if (!deletedContent) {
            return res.status(404).json({
                message: "Content not found",
            });
        }
        return res.status(200).json({
            message: "Content deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete content",
        });
    }
};
//# sourceMappingURL=contents.controller.js.map