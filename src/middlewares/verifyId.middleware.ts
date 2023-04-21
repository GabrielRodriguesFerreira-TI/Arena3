import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import { AppError } from "../errors/erros";

export const verifyIdExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parms: string = req.params?.user_id;

  const user = await User.findById(parms);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return next();
};
