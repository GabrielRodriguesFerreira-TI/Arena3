import { Request, Response } from "express";
import {
  iCreateUser,
  iCreateUserReturn,
  iQueryValues,
  iRetrieveUserPagination,
  iUpdatedUser,
} from "../../interfaces/users.types";
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
  const file: string = req.params.filename;
  const userId: string = req.params.user_id;

  await Users.deleteUserProfileImageService(file, userId);

  return res.sendStatus(204);
};

export const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryValues: iQueryValues = {
    page: req.query.page,
    limit: req.query.limit,
  };

  const users: iRetrieveUserPagination = await Users.retrieveUsersService(
    queryValues
  );

  return res.status(200).json(users);
};

export const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iUpdatedUser = req.body;

  const updatedUser = await Users.updateUsersService(userInfo, req);

  return res.status(200).json(updatedUser);
};

export const deletedUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await Users.deletedUserService(req);

  return res.status(204).send();
};

export const deactivatedUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await Users.deactivatedUsersService(req, res);

  return res.status(204).send();
};
