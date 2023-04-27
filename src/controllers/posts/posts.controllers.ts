import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";

export const uploadPostMidiaController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const file = req.file!;
  const userId: string = req.params.user_id;

  const response = await Posts.uploadPostMidiaService(file, userId);

  return res.status(200).json(response);
};
