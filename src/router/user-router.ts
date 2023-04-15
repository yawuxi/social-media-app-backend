import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { loginSchema } from "../validations/login";
import { registrationSchema } from "../validations/registration";

export const userRouter = Router();

userRouter.post("/registration", registrationSchema, UserController.createUser);
userRouter.post("/login", loginSchema, UserController.signInUser);
userRouter.post("/logout", UserController.signOut);
userRouter.get("/refresh", UserController.refresh);
userRouter.get("/all", authMiddleware, UserController.getAllUsers);
