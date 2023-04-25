import { Request } from "express";
import { User } from "../../models/User.model";
import S3Storage from "../../utils/S3Storage";

export const deletedUserService = async (req: Request): Promise<void> => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  if (user?.imageProfile) {
    const s3Storage = new S3Storage();
    await s3Storage.deleteFile(user.imageProfile);
  }

  await User.deleteOne({ _id: user_id });
};
