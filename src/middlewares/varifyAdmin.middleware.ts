import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/erros";

export const adminValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.jwtAdminUser) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
