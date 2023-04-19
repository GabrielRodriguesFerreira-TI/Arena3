import { Request, Response } from "express";
import { iLoginUser } from "../../interfaces/usersLogin.types";
import { createLoginService } from "../../services/usersLogin/createLogin.service";
import { userRefreshTokenService } from "../../services/usersLogin/userRefreshToken.service";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iLoginUser = req.body;

  const token: string = await createLoginService(userInfo, res);

  return res.json(token);
};

export const userRefreshTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const refreshToken: string = req.cookies.refreshToken;

  const response = await userRefreshTokenService(refreshToken, res, req);

  return res.status(200).json(response);
};
