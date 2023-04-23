import { Request, Response } from "express";
import { iCreateUser, iCreateUserReturn } from "../../interfaces/users.types";
import * as Users from "../../services/users/index";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iCreateUser = req.body;

  const createdUser: iCreateUserReturn = await Users.createUserServices(
    userInfo
  );

  return res.status(201).json(createdUser);
};

export const uploadUserProfileImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const file = req.file!;
  const userId: string = req.params.user_id;

  const response = await Users.uploadUserProfileImageService(file, userId);

  return res.status(200).json(response);
};

export const deleteUserProfileImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const file = req.params.filename;
  const userId: string = req.params.user_id;

  await Users.deleteUserProfileImageService(file, userId);

  return res.sendStatus(204);
};
