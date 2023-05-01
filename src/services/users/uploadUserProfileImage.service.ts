import { User } from "../../models/User.model";
import S3Storage from "../../utils/S3Storage";
import crypto from "crypto";

export const uploadUserProfileImageService = async (
  file: Express.Multer.File,
  userId: string
): Promise<any> => {
  const fileName = `${crypto.randomBytes(10).toString("hex")}-${
    file!.originalname
  }`;

  const s3Storage = new S3Storage();
  await User.findByIdAndUpdate(userId, {
    $set: {
      imageProfile: String(fileName),
    },
  });

  await s3Storage.saveFile(fileName, file.buffer);

  return { message: `${fileName}` };
};
