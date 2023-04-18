import { Request, Response } from "express";
import { iLoginUser } from "../../interfaces/usersLogin.types";
import { createLoginService } from "../../services/usersLogin/createLogin.service";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iLoginUser = req.body;

  const token: string = await createLoginService(userInfo, res);

  return res.json(token);
};
