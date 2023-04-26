import validator from "validator";
import mongoose from "mongoose";
import { iCreateUser } from "../interfaces/users/users.types";
import { addPasswordHashingToSchema } from "../hooks/hashingPassword";
import mongoosePaginate from "mongoose-paginate-v2";
import { ICustomModel } from "../interfaces/global/paginate.types";

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
    imageProfile: { type: String, required: false },
    isAdmin: { type: Boolean, required: false, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true, autoCreate: false }
);

userSchema.index({ deletedAt: 1 });
userSchema.plugin(mongoosePaginate);

addPasswordHashingToSchema(userSchema);

userSchema.methods.UserWithoutPassword = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

export const User = mongoose.model<iCreateUser, ICustomModel<iCreateUser>>(
  "Users",
  userSchema
);
