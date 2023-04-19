import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/erros";
import { JwtPayload, VerifyErrors, verify } from "jsonwebtoken";

export const tokenValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const reqToken: string | undefined = req.headers.authorization;
  const accessToken: string | undefined = req.cookies.accessToken;

  if (!reqToken) {
    throw new AppError("Missing bearer token", 401);
  }

  if (!accessToken) {
    throw new AppError("Expired Token!", 401);
  }

  const token = reqToken.split(" ")[1];

  verify(
    token,
    String(process.env.ACCESS_TOKEN_SECRET),
    (error: VerifyErrors | null, decoded) => {
      if (error) {
        throw new AppError(error.message, 401);
      }

      req.jwtEmailUser = (decoded as JwtPayload).email;
      req.jwtIdUser = (decoded as JwtPayload).sub!;
      req.jwtAdminUser = (decoded as JwtPayload).admin;
    }
  );

  return next();
};
