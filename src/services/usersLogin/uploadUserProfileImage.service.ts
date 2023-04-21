import { iUploadUserImageProfile } from "../../interfaces/users.types";
import { User } from "../../models/User.model";

export const uploadUserProfileImageService = async (
  payload: iUploadUserImageProfile
): Promise<any> => {
  const { avatarUrl, userId } = payload;

  const user = await User.findById(userId);
  user!.imageProfile = avatarUrl;
  await user!.save();

  return { message: "Image updated successfully!" };
};
