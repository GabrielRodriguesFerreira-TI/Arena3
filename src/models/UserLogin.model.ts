import mongoose from "mongoose";
import validator from "validator";
import { iLoginUser } from "../interfaces/usersLogin.types";

export const userLoginSchema = new mongoose.Schema<iLoginUser>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is invalid!",
    },
  },
  password: { type: String, required: true },
});
