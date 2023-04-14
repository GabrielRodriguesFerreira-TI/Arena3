import { Mixed } from "mongoose";

export interface iCreateUser {
  username: string;
  password: string;
  email: string | Mixed;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
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
