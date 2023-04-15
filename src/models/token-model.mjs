import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  refreshToken: { type: String, required: true },
});

export const TokeModel = model("token", schema);
