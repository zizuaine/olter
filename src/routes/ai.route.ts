import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { aiController } from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post("/", AuthMiddleware, aiController);

export { aiRouter }