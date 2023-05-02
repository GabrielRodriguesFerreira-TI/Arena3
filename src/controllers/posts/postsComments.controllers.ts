import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";
import { iCreateComments } from "../../interfaces/comments/comments.types";

export const createCommentPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentInfo: iCreateComments = req.body;
  const postId = req.params.post_id;
  const userId = req.params.user_id;

  const response = await Posts.createCommentPostService(
    commentInfo,
    postId,
    userId
  );

  return res.status(201).json(response);
};
