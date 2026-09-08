import { brainModel } from "../models/brain.js";
import { processContent } from "../services/processContent.js";
export const addToBrain = async (req, res) => {
    const { link, note, title } = req.body;
    const brainId = req.params.id;
    const user = req.userId;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const brain = await brainModel.findOne({
            _id: brainId,
            members: user
        });
        if (!brain) {
            throw new Error("Not a member of this brain");
        }
        const content = await processContent(user, brainId, link, title, note);
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
//# sourceMappingURL=brain.controller.js.map