import { Router } from "express";
import { sendQuery as sendQueryController, getExistingChat as getChatController, getAllChats as getAllChatsController, deleteChat as deleteChatController } from "../controllers/chat.controller.js";
import { AuthMiddleware } from "../middleware/auth.js";
const chatRouter = Router();
chatRouter.get("/", AuthMiddleware, getAllChatsController);
chatRouter.get("/:id", AuthMiddleware, getChatController);
chatRouter.post("/message", AuthMiddleware, sendQueryController);
chatRouter.post("/message/:id", AuthMiddleware, sendQueryController);
chatRouter.delete("/:id", AuthMiddleware, deleteChatController);
export { chatRouter };
//# sourceMappingURL=chat.route.js.map