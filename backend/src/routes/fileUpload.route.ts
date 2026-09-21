import { Router } from "express";
import type { Request, Response } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import multer from "multer";
import { processContent } from "../services/processContent.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${req.userId}-${file.originalname}`)
    }
})
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only PDF files are allowed"))
        }
    }
})

router.post("/upload",
    upload.single("document"),
    AuthMiddleware,
    async (req: Request, res: Response) => {
        const user = req.userId;
        const brainId = req.body.brainId
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No PDF uploaded"
            });
        }

        const PDF = req.file

        try {
            const content = await processContent(
                user,
                brainId,
                undefined,
                undefined,
                undefined,
                PDF
            )

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
    });

export default router;