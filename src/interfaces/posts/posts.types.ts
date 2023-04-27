import { Document } from "mongoose";
import { iCreateUserReturn } from "../users/users.types";

type iAuthor = Omit<
  iCreateUserReturn,
  "email" | "firstName" | "lastName" | "isAdmin" | "createdAt" | "updatedAt"
>;

export interface iCreatPost extends Document {
  description: string;
  author: iAuthor;
  media?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
