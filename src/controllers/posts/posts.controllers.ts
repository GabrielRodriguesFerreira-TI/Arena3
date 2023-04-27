import { Request, Response } from "express";
import * as Posts from "../../services/posts/index";
import { iPayloadUploadMidia } from "../../interfaces/posts/posts.types";

export const uploadPostMidiaController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: iPayloadUploadMidia = {
    file: req.file!,
    userId: req.params.user_id,
    fileType: req.params.type,
    req: req,
    res: res,
  };

  const response = await Posts.uploadPostMidiaService(payload);

  return res.status(200).json(response);
};
