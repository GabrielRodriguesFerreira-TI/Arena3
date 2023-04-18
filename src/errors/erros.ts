import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { MulterError } from "multer";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleErros = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json(error.errors);
  }

  if (error instanceof MongoServerError || error instanceof TypeError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File too large" });
  }

  return res.status(500).json({
    message: error.name,
  });
};

export { AppError, handleErros };
