import { body } from "express-validator";

export const registrationSchema = [
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  body("sex").notEmpty(),
  body("name").notEmpty(),
  body("dateOfBirth").notEmpty(),
];
