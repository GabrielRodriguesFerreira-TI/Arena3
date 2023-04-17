import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { upload } from "../config/upload.aws";

const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({ message: "Error uploading file" });
};

export const handleFileUpload = (): RequestHandler => {
  return upload.any() as RequestHandler;
};

export const handleFileUploadWithErrors = (): RequestHandler => {
  return [upload.any(), errorHandler] as unknown as RequestHandler;
};
