import { Router } from "express";
import {
  createUserController,
  uploadUserProfileImageController,
} from "../controllers/users/users.controllers";
import { upload } from "../middlewares/upload.multer";

export const usersRoutes: Router = Router();

usersRoutes.post("/users", createUserController);

usersRoutes.post(
  "/users/upload-image/:user_id",
  upload.single("avatar"),
  uploadUserProfileImageController
);

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
