import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { addContents as addContentsController, getContents as getContentsController, getContent as getContentController, deleteContents as deleteContentsController } from "../controllers/contents.controller.js";
const contentsRouter = Router();
contentsRouter.get("/", AuthMiddleware, getContentsController);
contentsRouter.post("/", AuthMiddleware, addContentsController);
contentsRouter.get("/:id", AuthMiddleware, getContentController);
contentsRouter.delete("/:id", AuthMiddleware, deleteContentsController);
export { contentsRouter };
//# sourceMappingURL=contents.route.js.map