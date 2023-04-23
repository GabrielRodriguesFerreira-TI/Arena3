import { User } from "../../models/User.model";
import S3Storage from "../../utils/S3Storage";

export const deleteUserProfileImageService = async (
  file: string,
  userId: string
): Promise<void> => {
  const s3Storage = new S3Storage();

  await User.findByIdAndUpdate(userId, { $set: { imageProfile: null } });

  await s3Storage.deleteFile(file);
};
