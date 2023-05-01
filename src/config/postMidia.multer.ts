import "dotenv/config";
import { Request } from "express";
import { AppError } from "../errors/erros";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: String(process.env.CLOUDINARY_API_KEY),
  api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

export default {
  config: {
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
      fileSize: 1024 * 1024 * 40, // limite de 40MB
    },
  },
};
