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
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Middlewares.verifyImageProfileMiddlewares,
  upload.single("image"),
  Users.default.users.uploadUserProfileImageController
);

usersRoutes.delete(
  "/users/upload/:filename/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Users.default.users.deleteUserProfileImageController
);

usersRoutes.get(
  "/users",
  Middlewares.tokenValidationMiddleware,
  Users.default.users.retrieveUsersController
);

usersRoutes.get(
  "/users/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Users.default.users.retrieveOneUserController
);

usersRoutes.patch(
  "/users/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Users.default.users.updateUsersController
);

usersRoutes.delete(
  "/users/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Users.default.users.deletedUsersController
);

usersRoutes.delete(
  "/users/deactivated/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Users.default.users.deactivatedUsersController
);
