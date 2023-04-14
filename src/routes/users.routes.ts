import { Router } from "express";
import { createUserController } from "../controllers/users/users.controllers";

export const usersRoutes: Router = Router();

usersRoutes.post("/users", createUserController);

usersRoutes.get("/users");

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
