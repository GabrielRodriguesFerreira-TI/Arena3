import { Router } from "express";
import * as UserLogin from "../controllers/users/index";
import * as Middleware from "../middlewares/index";

export const usersLoginRoutes: Router = Router();

usersLoginRoutes.post(
  "/login",
  UserLogin.default.usersLogin.userLoginController
);

usersLoginRoutes.post(
  "/login/token",
  UserLogin.default.usersLogin.userRefreshTokenController
);

usersLoginRoutes.post(
  "/logout",
  Middleware.tokenValidationMiddleware,
  UserLogin.default.usersLogin.userLogoutController
);
