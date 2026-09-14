import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import type { Request, Response } from "express";
import { brainModel } from "../models/brain.js";
import { addToBrain as addToBrainController } from "../controllers/brain.controller.js";
export const brainRouter = Router();

brainRouter.post("/", AuthMiddleware, async (req: Request, res: Response) => {
    const user = req.userId;
    const brainName = req.body.brainName;

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const brain = await brainModel.create({
            ownerId: user,
            name: brainName,
            members: [user]
        });

        res.status(201).json({
            message: "New Brain created",
            brain: {
                _id: brain._id,
                name: brain.name,
                ownerId: brain.ownerId
            },
            token: brain.shareToken
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Failed to create brain"
        })
    }
})

brainRouter.post("/join/:token", AuthMiddleware, async (req: Request, res: Response) => {
    const token = req.params.token;
    const user = req.userId;

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (!token) {
        return res.status(400).json({
            message: "Token is required"
        });
    }

    try {
        const brain = await brainModel.findOneAndUpdate(
            { shareToken: token },
            { $addToSet: { members: user } },
            { new: true }
        );

        if (!brain) {
            return res.status(404).json({
                message: "Invalid brain token"
            });
        }

        res.status(200).json({
            message: "Joined brain",
            brain: {
                _id: brain._id,
                name: brain.name,
                ownerId: brain.ownerId
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Brain not found"
        })
    }
});

brainRouter.get("/", AuthMiddleware, async (req: Request, res: Response) => {
    const user = req.userId;

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const brains = await brainModel.find({
            members: user
        }).select("_id name ownerId");

        if (!brains) {
            res.status(404).json({ message: "no brain found" });
            return;
        }
        res.status(200).json({
            brains
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch brain" });
    }

})

brainRouter.get("/:id", AuthMiddleware, async (req: Request, res: Response) => {
    const brainId = req.params.id;
    const user = req.userId;

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const brain = await brainModel.findOne({
            _id: brainId,
            members: user
        });

        if (!brain) {
            res.status(404).json({ message: "Brain not found" });
            return;
        }

        res.status(200).json({
            message: "Brain found",
            name: brain.name,
            ownerId: brain.ownerId,
            shareToken: brain.ownerId.toString() === user
                ? brain.shareToken
                : undefined
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch brain" });
    }
})

brainRouter.post("/:id/content", AuthMiddleware, addToBrainController)

brainRouter.delete("/:id", AuthMiddleware, async (req: Request, res: Response) => {
    const brainId = req.params.id;
    const user = req.userId;

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (!brainId) {
        res.status(400).json({ message: "Brain ID is required" });
        return;
    }

    try {
        const brain = await brainModel.findOneAndDelete({
            _id: brainId,
            ownerId: user
        });

        if (!brain) {
            res.status(404).json({
                message: "Brain not found or you are not the owner"
            });
            return;
        }

        res.status(200).json({
            message: "Brain deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete brain"
        });
    }
});