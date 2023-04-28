import { Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import { AppError } from "../errors/erros";
import JsonFileStore from "./jsonFileStore.config";

export const videoUploadRateLimit = expressRateLimit({
  store: new JsonFileStore("videoUploadRateLimit.json"),
  windowMs: 30 * 60 * 1000, // 30 minutos
  max: 1,
  handler: function (req: Request, res: Response) {
    throw new AppError(
      "You have reached your video upload limit. Please try again later.",
      429
    );
  },
});

export const imageUploadRateLimit = expressRateLimit({
  store: new JsonFileStore("imageUploadRateLimit.json"),
  windowMs: 30 * 60 * 1000, // 30 minutos
  max: 3,
  handler: function (req: Request, res: Response) {
    throw new AppError(
      "You have reached your video upload limit. Please try again later.",
      429
    );
  },
});
