import { Router } from "express";

export const usersRoutes: Router = Router();

usersRoutes.post("/users");

usersRoutes.get("/users");
