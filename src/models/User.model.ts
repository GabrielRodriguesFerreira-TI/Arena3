import validator from "validator";
import mongoose from "mongoose";
import { iCreateUser } from "../interfaces/users.types";

const userSchema = new mongoose.Schema<iCreateUser>(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      unique: true,
    },
    password: { type: String, required: true, maxlength: 200, minlength: 6 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Email is invalid!",
      },
    },
    firstName: { type: String, required: true, maxlength: 50, minlength: 4 },
    lastName: { type: String, required: true, maxlength: 50, minlength: 4 },
  },
  { timestamps: true }
);

export const User = mongoose.model<iCreateUser>("Users", userSchema);
