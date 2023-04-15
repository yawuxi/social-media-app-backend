import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PostModel = model("post", schema);
