import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { brainModel } from "../models/brain.js";
import { processContent } from "../services/processContent.js";
import { ApiError } from "../utils/ApiError.js";

interface BrainContentParams extends ParamsDictionary {
    id: string;
}

export const addToBrain = async (req: Request<BrainContentParams>, res: Response) => {
    const { link, note, title } = req.body;
    const brainId = req.params.id;

    const user = req.userId;
    if (!user) {
        throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
    }

    const brain = await brainModel.findOne({
        _id: brainId,
        members: user
    });

    if (!brain) {
        throw new ApiError(403, "BRAIN_ACCESS_DENIED", "Not a member of this brain");
    }
    const content = await processContent(user, brainId, link, title, note);
    res.status(200).json({
        message: "content successfully added",
        content
    });

}
