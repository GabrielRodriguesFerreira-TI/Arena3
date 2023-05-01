import "dotenv/config";
import { Request } from "express";
import { AppError } from "../errors/erros";

export default {
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
