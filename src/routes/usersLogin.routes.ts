import { Router } from "express";
import { userLoginController } from "../controllers/users/usersLogin.controllers";

export const usersLoginRoutes: Router = Router();

usersLoginRoutes.post("/login", userLoginController);
