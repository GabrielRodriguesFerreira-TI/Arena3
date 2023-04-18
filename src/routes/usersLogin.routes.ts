import { Router } from "express";
import {
  userLoginController,
  userRefreshTokenController,
} from "../controllers/users/usersLogin.controllers";

export const usersLoginRoutes: Router = Router();

usersLoginRoutes.post("/login", userLoginController);

usersLoginRoutes.post("/login/token", userRefreshTokenController);

usersLoginRoutes.post("/logout");
