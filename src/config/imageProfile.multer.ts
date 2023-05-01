import "dotenv/config";
import crypto from "crypto";
import { Request } from "express";
import { AppError } from "../errors/erros";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: String(process.env.CLOUDINARY_API_KEY),
  api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

export default {
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      public_id: (req, file) =>
        `${crypto.randomBytes(10).toString("hex")}-${file.originalname}`,
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
