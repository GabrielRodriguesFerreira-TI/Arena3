import "dotenv/config";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { AppError } from "../errors/erros";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
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
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError("Only images are allowed!"), false);
    }
  },
  limits: {
    fileSize: 3 * 1024 * 1024, // 3mb em bytes
  },
};
