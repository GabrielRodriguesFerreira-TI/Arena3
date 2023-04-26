import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import S3Storage from "../utils/S3Storage";

export const verifyImageProfileMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = req.params.user_id;

  const user = await User.findById(userId);

  if (user?.imageProfile) {
    const s3Storage = new S3Storage();

    await s3Storage.deleteFile(user.imageProfile);
    user.imageProfile = null;
  }

  return next();
};
