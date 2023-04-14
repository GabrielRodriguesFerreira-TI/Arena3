import { Request, Response } from "express";
import { iCreateUser, iCreateUserReturn } from "../../interfaces/users.types";

export const createUserController = async (req: Request, res: Response) => {
  const userInfo: iCreateUser = req.body;

  const createdUser: iCreateUserReturn = await createUserServices(userInfo);

  return res.status(201).json(createdUser);
};
