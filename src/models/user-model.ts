import { Schema, model, InferSchemaType, Types } from "mongoose";

const schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    sex: { type: String, required: true },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof schema> & { _id: Types.ObjectId };

export const UserModel = model("user", schema);
