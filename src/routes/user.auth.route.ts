import { Router } from "express";
import { signUp as signUpController } from "../controllers/auth.controller.js";
import { signIn as signInController } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);

export { userRouter }