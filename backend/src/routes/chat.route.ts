import { Router } from "express";
import {
    createChat as createChatController,
    sendQuery as sendQueryController,
    getExistingChat as getChatController,
    getAllChats as getAllChatsController,
    deleteChat as deleteChatController
} from "../controllers/chat.controller.js";
import { AuthMiddleware } from "../middleware/auth.js";

const chatRouter = Router();

chatRouter.get("/", AuthMiddleware, getAllChatsController);
chatRouter.post("/", AuthMiddleware, createChatController);
chatRouter.get("/:id", AuthMiddleware, getChatController);
chatRouter.post("/message/:id", AuthMiddleware, sendQueryController);
chatRouter.delete("/:id", AuthMiddleware, deleteChatController);

export { chatRouter }