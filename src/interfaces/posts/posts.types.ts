import { Document } from "mongoose";
import { iCreateUserReturn } from "../users/users.types";
import { Request, Response } from "express";

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

export interface iPayloadUploadMidia {
  file: Express.Multer.File;
  userId: string;
  fileType: string;
  req: Request;
  res: Response;
}
