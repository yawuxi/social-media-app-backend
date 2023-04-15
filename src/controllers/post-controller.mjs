import { PostService } from "../services/post-service.mjs";

class Controller {
  async getAllPosts(req, res, next) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async getPostById(req, res, next) {
    const { id } = req.params;

    try {
      const post = await PostService.getPostById(id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async createPost(req, res, next) {
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
