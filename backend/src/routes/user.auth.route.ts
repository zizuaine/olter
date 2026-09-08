import { Router } from "express";
import { signUp as signUpController } from "../controllers/auth.controller.js";
import { signIn as signInController } from "../controllers/auth.controller.js";
import { getUser as meController } from "../controllers/me.controller.js";
import { AuthMiddleware } from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);
userRouter.get("/me", AuthMiddleware, meController)

export { userRouter }