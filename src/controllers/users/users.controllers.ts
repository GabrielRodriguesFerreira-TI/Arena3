import { Request, Response } from "express";
import {
  iCreateUser,
  iCreateUserReturn,
  iUploadUserImageProfile,
} from "../../interfaces/users.types";
import { createUserServices } from "../../services/users/createUsers.service";
import { uploadUserProfileImageService } from "../../services/usersLogin/uploadUserProfileImage.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iCreateUser = req.body;

  const createdUser: iCreateUserReturn = await createUserServices(userInfo);

  return res.status(201).json(createdUser);
};

export const uploadUserProfileImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iUploadUserImageProfile = {
    userId: req.params.user_id,
    avatarUrl: req.file!.path,
  };
  console.log("teste");
  const response = await uploadUserProfileImageService(userInfo);

  return res.status(200).json(response);
};
