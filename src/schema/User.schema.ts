import Joi from "@hapi/joi";
import { iUpdatedUser } from "../interfaces/users.types";

export const updatedUserSchema = Joi.object<iUpdatedUser>({
  username: Joi.string().optional().messages({
    "string.username": "The username provided is invalid!",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.min": "Password must be at least 6 characters long!",
    "string.password": "The username provided is invalid!",
  }),
  firstName: Joi.string().optional().messages({
    "string.firstName": "The username provided is invalid!",
  }),
  lastName: Joi.string().optional().messages({
    "string.lastName": "The username provided is invalid!",
  }),
})
  .options({ abortEarly: false })
  .optional();
