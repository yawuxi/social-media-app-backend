import { Router } from "express";
import { UserController } from "../controllers/user-controller.mjs";
import { authMiddleware } from "../middlewares/auth-middleware.mjs";
import { loginSchema } from "../validations/login.mjs";
import { registrationSchema } from "../validations/registration.mjs";
export const userRouter = Router();

userRouter.post("/registration", registrationSchema, UserController.createUser);
userRouter.post("/login", loginSchema, UserController.signInUser);
userRouter.post("/logout", UserController.signOut);
userRouter.get("/refresh", UserController.refresh);
userRouter.get("/all", authMiddleware, UserController.getAllUsers);
