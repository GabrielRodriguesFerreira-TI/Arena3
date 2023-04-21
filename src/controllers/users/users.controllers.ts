import { Request, Response } from "express";
import {
  iCreateUser,
  iCreateUserReturn,
  iUploadUserImageProfile,
} from "../../interfaces/users.types";
import { createUserServices } from "../../services/users/createUsers.service";
import { uploadUserProfileImageService } from "../../services/users/uploadUserProfileImage.service";

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
  const file = req.file!;

  const response = await uploadUserProfileImageService(file);

  return res.status(200).json(response);
};
