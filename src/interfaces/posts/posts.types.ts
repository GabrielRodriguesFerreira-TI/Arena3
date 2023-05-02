import mongoose, { Document } from "mongoose";
import { iCreateUserReturn } from "../users/users.types";

export type iAuthor = Omit<
  iCreateUserReturn,
  "email" | "firstName" | "lastName" | "isAdmin" | "createdAt" | "updatedAt"
>;

export interface iCreatPost extends Document {
  description: string;
  author: mongoose.Schema.Types.ObjectId;
  midia?: string | null;
  comments?: [mongoose.Schema.Types.ObjectId];
  createdAt?: string;
  updatedAt?: string;
}

export interface iCreatePostResult {
  description: string;
  author: iAuthor;
  midia?: string | null;
  comments?: [mongoose.Schema.Types.ObjectId];
  createdAt?: string;
  updatedAt?: string;
}

export interface iStore {
  incr: any;
  decrement(key: string): void;
  resetKey(key: string): void;
  resetAll(): void;
}
