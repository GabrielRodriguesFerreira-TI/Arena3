import { Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import { AppError } from "../errors/erros";

export const videoUploadRateLimit = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1,
  handler: function (req: Request, res: Response) {
    throw new AppError(
      "You have reached your video upload limit. Please try again later.",
      429
    );
  },
});
