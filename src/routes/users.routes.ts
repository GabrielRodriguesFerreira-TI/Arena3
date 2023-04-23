import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/upload.aws";
import * as Middlewares from "../middlewares/index";
import * as Users from "../controllers/users/index";

export const usersRoutes: Router = Router();
const upload = multer(multerConfig);

usersRoutes.post("/users", Users.default.users.createUserController);

usersRoutes.patch(
  "/users/upload/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyPermissionMiddlewares,
  upload.single("image"),
  Users.default.users.uploadUserProfileImageController
);

usersRoutes.delete(
  "/users/upload/:filename/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyPermissionMiddlewares,
  Users.default.users.deleteUserProfileImageController
);

usersRoutes.get("/users/:user_id");

usersRoutes.patch("/users/:user_id");

usersRoutes.delete("/users/:user_id");
