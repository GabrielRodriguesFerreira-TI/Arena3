import { Request } from "express";
import { User } from "../../models/User.model";
import { iCreateUserReturn } from "../../interfaces/users/users.types";

export const retrieveOneUserService = async (
  req: Request
): Promise<iCreateUserReturn> => {
  const userId: string = req.params.user_id;

  const user = await User.findOne({
    _id: userId,
    deletedAt: { $exists: false },
  }).select("-isAdmin");

  const userReturn = user!.UserWithoutPassword();

  return userReturn;
};
