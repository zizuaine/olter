import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { addContents as addContentsController, getContents as getContentsController } from "../controllers/contents.controller.js";

const contentsRouter = Router();

contentsRouter.get("/", AuthMiddleware, getContentsController);
contentsRouter.post("/", AuthMiddleware, addContentsController);

export { contentsRouter };