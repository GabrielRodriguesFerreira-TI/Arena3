import "dotenv/config";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { AppError } from "../errors/erros";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  config: {
    directory: tmpFolder,
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request: Request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");

        const fileName = `${fileHash}-${file.originalname}`;

        request.midiaPath = fileName;

        return callback(null, fileName);
      },
    }),
    fileFilter: (
      request: Request,
      file: Express.Multer.File,
      callback: Function
    ) => {
      const allowedMimeTypes = ["video/mp4", "video/webm", "video/x-msvideo"];
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new AppError("Only videos are allowed!"), false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 80, // limite de 80MB
    },
  },
};
