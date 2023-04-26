import { Request, Response } from "express";
import { User } from "../../models/User.model";
import S3Storage from "../../utils/S3Storage";

export const deletedUserService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  if (user?.imageProfile) {
    const s3Storage = new S3Storage();
    await s3Storage.deleteFile(user.imageProfile);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  await User.deleteOne({ _id: user_id });
};
