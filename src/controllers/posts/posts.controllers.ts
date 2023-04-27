import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";

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
