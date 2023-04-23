import { User } from "../../models/User.model";
import S3Storage from "../../utils/S3Storage";

export const uploadUserProfileImageService = async (
  file: Express.Multer.File,
  userId: string
): Promise<any> => {
  const s3Storage = new S3Storage();

  await User.findByIdAndUpdate(userId, {
    $set: {
      imageProfile: String(file.filename),
    },
  });

  await s3Storage.saveFile(file.filename);

  return { message: "Image updated successfully!" };
};
