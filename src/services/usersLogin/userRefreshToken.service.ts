import "dotenv/config";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { AppError } from "../../errors/erros";
import { Request, Response } from "express";
import { ParamType } from "../../interfaces/users/users.types";

export const userRefreshTokenService = async (
  refreshToken: ParamType,
  res: Response,
  req: Request
): Promise<{ message: string }> => {
  if (!refreshToken) {
    throw new AppError("Refresh token is missing!");
  }

  verify(
    String(refreshToken),
    String(process.env.REFRESH_TOKEN_SECRET),
    (err, decoded) => {
      if (err) {
        throw new AppError(err.message, 401);
      }

      const accessToken = sign(
        { email: (decoded as JwtPayload).email },
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          expiresIn: Number(process.env.ACCESS_TOKEN_LIFE),
          subject: String((decoded as JwtPayload).id),
        }
      );

      req.jwtEmailUser = (decoded as JwtPayload).email;
      req.jwtIdUser = (decoded as JwtPayload).sub!;
      req.jwtAdminUser = (decoded as JwtPayload).admin;

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: Number(process.env.ACCESS_COOKIE_LIFE),
      });
    }
  );

  return { message: "Access token successfully renewed!" };
};
