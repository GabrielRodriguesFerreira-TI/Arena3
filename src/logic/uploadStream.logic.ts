import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import { bufferToStream } from "./bufferTrasnform.logic";

export const uploadToCloudinary = (file: Express.Multer.File) => {
  const { buffer, originalname } = file;

  const stream = bufferToStream(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        public_id: `${crypto.randomBytes(10).toString("hex")}-${originalname}`,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.pipe(uploadStream);
  });
};
