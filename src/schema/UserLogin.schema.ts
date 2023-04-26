import Joi from "@hapi/joi";
import { iLoginUser } from "../interfaces/users/usersLogin.types";

export const userLoginSchema = Joi.object<iLoginUser>({
  email: Joi.string().email().required().lowercase().messages({
    "string.email": "The email provided is invalid!",
    "any.required": "The email field is required!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long!",
    "any.required": "The password field is required!",
  }),
}).options({ abortEarly: false });
