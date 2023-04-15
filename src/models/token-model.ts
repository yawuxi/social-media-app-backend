import { Schema, model, InferSchemaType } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  refreshToken: { type: String, required: true },
});

export type Token = InferSchemaType<typeof schema>;

export const TokeModel = model("token", schema);
