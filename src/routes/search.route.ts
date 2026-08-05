import { Router } from "express";
import { searchQuery as searchQueryController } from "../controllers/search.controller.js";
import { AuthMiddleware } from "../middleware/auth.js";

const searchRouter = Router();

searchRouter.post("/", AuthMiddleware, searchQueryController);

export { searchRouter }