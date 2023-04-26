import { Request } from "express";
import { iCreateUserReturn, iUpdatedUser } from "../../interfaces/users.types";
import { User } from "../../models/User.model";
import { updatedUserSchema } from "../../schema/User.schema";
import { CustomValidationError } from "../../errors/erros";
import { hashSync } from "bcryptjs";

export const updateUsersService = async (
  body: iUpdatedUser,
  req: Request
): Promise<iCreateUserReturn> => {
  const { user_id } = req.params;
  const { error } = updatedUserSchema.validate(body);

  if (error) {
    throw new CustomValidationError("Validation error", 422, error.details);
  }

  if (body.password) {
    body.password = hashSync(body.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    user_id,
    { $set: body },
    { new: true }
  ).select("-isAdmin");

  const returnUser = user!.UserWithoutPassword();

  return returnUser;
};
