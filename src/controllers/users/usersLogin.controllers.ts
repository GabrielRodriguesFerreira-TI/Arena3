import { Request, Response } from "express";
import { iLoginUser } from "../../interfaces/users/usersLogin.types";
import * as UsersLogin from "../../services/usersLogin/index";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: iLoginUser = req.body;

  const token: string = await UsersLogin.createLoginService(userInfo, res);

  return res.json(token);
};

export const userRefreshTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const refreshToken: string = req.cookies.refreshToken;

  const response = await UsersLogin.userRefreshTokenService(
    refreshToken,
    res,
    req
  );

  return res.status(200).json(response);
};

export const userLogoutController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UsersLogin.userLogoutService(res);

  return res.status(200).json(response);
};
