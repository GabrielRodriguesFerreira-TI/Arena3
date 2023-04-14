import { Router } from "express";

export const usersRoutes: Router = Router();

usersRoutes.post("/users");

usersRoutes.get("/users");

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
