import { Response } from "express";

export const userLogoutService = async (res: Response): Promise<any> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return { message: "Successfully logged out!" };
};
