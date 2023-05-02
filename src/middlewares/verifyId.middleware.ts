import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import { AppError } from "../errors/erros";
import { Post } from "../models/Post.model";

export const verifyIdExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userParms: string = req.params?.user_id;
  const postParams: string = req.params?.post_id;

  if (userParms) {
    const user = await User.findById(userParms);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    if (user.deletedAt) {
      throw new AppError("User deactivated!", 404);
    }
  }

  if (postParams) {
    const post = await Post.findById(postParams);

    if (!post) {
      throw new AppError("Post not found!", 404);
    }
  }

  return next();
};
