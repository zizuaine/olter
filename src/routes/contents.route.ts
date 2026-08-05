import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import {
    addContents as addContentsController,
    getContents as getContentsController,
    deleteContents as deleteContentsController
} from "../controllers/contents.controller.js";

const contentsRouter = Router();

contentsRouter.get("/", AuthMiddleware, getContentsController);
contentsRouter.post("/", AuthMiddleware, addContentsController);
contentsRouter.delete("/:id", AuthMiddleware, deleteContentsController)

export { contentsRouter };