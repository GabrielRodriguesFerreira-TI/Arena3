import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/erros";

export const verifyPermissionMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = req.jwtIdUser;
  const userAdmin: boolean = req.jwtAdminUser;
  const params: string = req.params.user_id;

  if (userAdmin !== true && userId !== params) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
