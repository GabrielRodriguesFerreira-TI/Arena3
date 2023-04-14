import { Document, Mixed } from "mongoose";

export interface iCreateUser extends Document {
  username: string;
  password: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  UserWithoutPassword: () => Omit<this, "password">;
}

export interface iCreateUserReturn {
  _id: Object;
  username: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
}
