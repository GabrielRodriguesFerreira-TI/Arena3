import "dotenv/config";
import { compare } from "bcryptjs";
import { AppError, CustomValidationError } from "../../errors/erros";
import { iLoginUser } from "../../interfaces/usersLogin.types";
import { User } from "../../models/User.model";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import { userLoginSchema } from "../../schema/UserLogin.schema";

export const createLoginService = async (
  payload: iLoginUser,
  res: Response
): Promise<any> => {
  const { error } = userLoginSchema.validate(payload);

  if (error) {
    throw new CustomValidationError("Validation error", 422, error.details);
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(
      "Email not registered, please register a new email",
      401
    );
  }

  const pwdMatch: boolean = await compare(payload.password, user.password);

  if (!pwdMatch) {
    throw new AppError("Incorrect password", 401);
  }

  const accessToken: string = sign(
    { email: payload.email, admin: user.isAdmin },
    String(process.env.ACCESS_TOKEN_SECRET),
    {
      expiresIn: Number(process.env.ACCESS_TOKEN_LIFE),
      subject: String(user.id),
    }
  );
  const refreshToken: string = sign(
    { email: payload.email, admin: user.isAdmin },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: Number(process.env.REFRESH_TOKEN_LIFE),
      subject: String(user.id),
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: Number(process.env.ACCESS_COOKIE_LIFE),
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: Number(process.env.REFRESH_COOKIE_LIFE),
  });

  return { accessToken, refreshToken };
};
