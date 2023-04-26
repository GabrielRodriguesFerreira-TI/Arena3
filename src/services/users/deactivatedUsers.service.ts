import { Request, Response } from "express";
import { User } from "../../models/User.model";
import { AppError } from "../../errors/erros";

export const deactivatedUsersService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  if (user?.deletedAt) {
    throw new AppError("User already deactivated!");
  }

  user!.deletedAt = new Date();
  await user!.save();

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
