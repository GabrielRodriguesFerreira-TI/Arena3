import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { MulterError } from "multer";
import { ValidationError, ValidationErrorItem } from "@hapi/joi";
import { FormattedErrorMessage } from "../interfaces/errors.types";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class CustomValidationError extends ValidationError {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
    details: ValidationErrorItem[]
  ) {
    super(message, details, {});
    this.statusCode = statusCode;
  }

  getFormattedErrorMessage(): FormattedErrorMessage {
    const details = this.details.reduce(
      (acc: Record<string, string>, detail) => {
        const { path, message } = detail;
        acc[path.join(".")] = message;
        return acc;
      },
      {}
    );
    return { message: details };
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

  if (error instanceof MulterError) {
    return res.status(413).json({ message: error.message });
  }

  if (error instanceof CustomValidationError) {
    const formattedErrorMessage = error.getFormattedErrorMessage();
    return res.status(error.statusCode).json(formattedErrorMessage);
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErros };
