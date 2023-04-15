import { Router } from "express";
import { postRouter } from "./post-router.mjs";
import { userRouter } from "./user-router.mjs";

export const rootRouter = Router();

rootRouter.use("/posts", postRouter);
rootRouter.use("/user", userRouter);
