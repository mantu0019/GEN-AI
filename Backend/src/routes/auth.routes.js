import { Router } from "express";
import {
  getMeUserController,
  loginUserController,
  logOutUserController,
  registerUserController,
} from "../controller/auth.controller.js";
import authMiddleware from "../middleware/user.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);

authRouter.get("/logout", logOutUserController);
authRouter.get("/get-me", authMiddleware, getMeUserController);

export default authRouter;
