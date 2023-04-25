import { Request } from "express";
import { iCreateUserReturn, iUpdatedUser } from "../../interfaces/users.types";
import { User } from "../../models/User.model";
import { updatedUserSchema } from "../../schema/User.schema";
import { CustomValidationError } from "../../errors/erros";

export const updateUsersService = async (
  body: iUpdatedUser,
  req: Request
): Promise<iCreateUserReturn> => {
  const { user_id } = req.params;
  const { error } = updatedUserSchema.validate(body);

  if (error) {
    throw new CustomValidationError("Validation error", 422, error.details);
  }

  const user = await User.findByIdAndUpdate(
    user_id,
    { $set: body },
    { new: true }
  );

  const returnUser = user!.UserWithoutPassword();

  return returnUser;
};
