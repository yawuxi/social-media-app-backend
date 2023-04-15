import { Router } from "express";
import { PostController } from "../controllers/post-controller.mjs";

export const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
postRouter.get("/:id", PostController.getPostById);
postRouter.post("/create", PostController.createPost);
