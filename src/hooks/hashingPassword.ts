import { Schema } from "mongoose";
import { iCreateUser } from "../interfaces/users.types";
import bcrypt from "bcryptjs";

export function addPasswordHashingToSchema(schema: Schema<iCreateUser>): void {
  schema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  });
}
