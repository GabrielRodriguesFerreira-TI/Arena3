import { Router } from "express";
import {
  createUserController,
  deleteUserProfileImageController,
  uploadUserProfileImageController,
} from "../controllers/users/users.controllers";
import { tokenValidationMiddleware } from "../middlewares/validToken.middleware";
import multer from "multer";
import multerConfig from "../config/upload.aws";

export const usersRoutes: Router = Router();
const upload = multer(multerConfig);

usersRoutes.post("/users", createUserController);

usersRoutes.patch(
  "/users/upload/:user_id",
  tokenValidationMiddleware,
  upload.single("image"),
  uploadUserProfileImageController
);

usersRoutes.delete(
  "/users/upload/:filename/:user_id",
  tokenValidationMiddleware,
  deleteUserProfileImageController
);

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
