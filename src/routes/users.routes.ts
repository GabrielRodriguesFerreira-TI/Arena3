import { Router } from "express";
import {
  createUserController,
  uploadUserProfileImageController,
} from "../controllers/users/users.controllers";
import { upload } from "../middlewares/upload.multer";
import { tokenValidationMiddleware } from "../middlewares/validToken.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post("/users", createUserController);

usersRoutes.patch(
  "/users/upload-image/:user_id",
  upload.single("avatar"),
  tokenValidationMiddleware,
  uploadUserProfileImageController
);

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
