import { Router } from "express";
import { postRouter } from "./post-router";
import { userRouter } from "./user-router";

export const rootRouter = Router();

rootRouter.use("/posts", postRouter);
rootRouter.use("/user", userRouter);
