import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";
import {
  iCreatPost,
  iCreatePostResult,
} from "../../interfaces/posts/posts.types";

export const createPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const PostInfo: iCreatPost = req.body;

  const postCreated: iCreatePostResult = await Posts.createPostService(
    PostInfo
  );

  return res.status(201).json(postCreated);
};

export const uploadMidiaPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const midiaInfo = req.file;

  const response = await Posts.uploadMidiaPostService(midiaInfo);

  return res.status(200).json(response);
};
