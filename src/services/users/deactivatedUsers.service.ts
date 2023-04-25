import { Request, Response } from "express";
import { User } from "../../models/User.model";

export const deactivatedUsersService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  user!.deletedAt = new Date();
  await user!.save();

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
