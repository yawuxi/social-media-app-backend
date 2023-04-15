import { Post, PostModel } from "../models/post-model";

class Service {
  getAllPosts() {
    return PostModel.find({});
  }

  getPostById(id: string) {
    return PostModel.findById(id);
  }

  createPost(post: Post) {
    return PostModel.create(post);
  }
}

export const PostService = new Service();
