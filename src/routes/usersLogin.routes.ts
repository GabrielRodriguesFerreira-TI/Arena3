import { Router } from "express";
import {
  userLoginController,
  userLogoutController,
  userRefreshTokenController,
} from "../controllers/users/usersLogin.controllers";
import { tokenValidationMiddleware } from "../middlewares/validToken.middleware";

export const usersLoginRoutes: Router = Router();

usersLoginRoutes.post("/login", userLoginController);

usersLoginRoutes.post("/login/token", userRefreshTokenController);

usersLoginRoutes.post(
  "/logout",
  tokenValidationMiddleware,
  userLogoutController
);
