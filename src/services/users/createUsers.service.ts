import { iCreateUser, iCreateUserReturn } from "../../interfaces/users.types";
import { User } from "../../models/User.model";

export const createUserServices = async (
  payload: iCreateUser
): Promise<iCreateUserReturn> => {
  const user = await User.create(payload);
  const userWithoutPassword = user.UserWithoutPassword();
  const { __v, ...rest } = userWithoutPassword;

  return rest;
};
