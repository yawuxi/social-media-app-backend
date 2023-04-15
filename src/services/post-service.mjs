import { PostModel } from "../models/post-model.mjs";

class Service {
  getAllPosts() {
    return PostModel.find({});
  }

  getPostById(id) {
    return PostModel.findById(id);
  }

  createPost(post) {
    return PostModel.create(post);
  }
}

export const PostService = new Service();
