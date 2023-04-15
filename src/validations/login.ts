import { body } from "express-validator";

export const loginSchema = [
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
];
