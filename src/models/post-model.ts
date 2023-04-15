import { Schema, model, InferSchemaType } from "mongoose";

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

export type Post = InferSchemaType<typeof schema>;

export const PostModel = model("post", schema);
