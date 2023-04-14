import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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

  if (error instanceof TypeError) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({
    message: "internal server error",
  });
};

export { AppError, handleErros };
