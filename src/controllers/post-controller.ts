import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/post-service";
import { Post } from "../models/post-model";

class Controller {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const post = await PostService.getPostById(id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async createPost(
    req: Request<object, object, Post>,
    res: Response,
    next: NextFunction
  ) {
    const postData = req.body;

    try {
      const post = await PostService.createPost(postData);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
}

export const PostController = new Controller();
