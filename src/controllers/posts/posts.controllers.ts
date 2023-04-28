import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";
import { iCreatPost } from "../../interfaces/posts/posts.types";

export const createPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const PostInfo: iCreatPost = req.body;

  const postCreated = await Posts.createPostService(PostInfo);

  return res.status(201).json(postCreated);
};

export const uploadImagePostMidiaController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await Posts.uploadImagePostMidiaService();

  return res.status(200).json(response);
};

export const uploadVideoPostMidiaController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const file = req.file!;
  const path = req.midiaPath;

  const response = await Posts.uploadVideoPostMidiaService(file, path);

  return res.status(200).json(response);
};

export const deletePostMidiaController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const fileName: string = req.params.filename;
  const userKey: string = req.ip;

  const response = await Posts.deletePostMidiaService(fileName, userKey);

  return res.status(200).json(response);
};
