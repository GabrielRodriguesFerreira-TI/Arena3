import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";
import { iCreateComments } from "../../interfaces/comments/comments.types";

export const createCommentPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentInfo: iCreateComments = req.body;

  const response = await Posts.createCommentPostService(commentInfo);

  return res.status(201).json(response);
};
