import { Router } from "express";
import * as Middlewares from "../middlewares/index";
import * as Posts from "../controllers/posts/index";
import multer from "multer";
import imageProfileMulter from "../config/imageProfile.multer";
import postMidiaMulter from "../config/postMidia.multer";
import {
  imageUploadRateLimit,
  videoUploadRateLimit,
} from "../config/midiaRateLimit.config";

export const postsRoutes: Router = Router();
const uploadImage = multer(imageProfileMulter);
const uploadPostMidia = multer(postMidiaMulter.config);

postsRoutes.post(
  "/posts/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Posts.default.createPostController
);

postsRoutes.patch(
  "/posts/upload/image/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  imageUploadRateLimit,
  uploadImage.single("image"),
  Posts.default.uploadImagePostMidiaController
);

postsRoutes.patch(
  "/posts/upload/video/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  videoUploadRateLimit,
  uploadPostMidia.single("video"),
  Posts.default.uploadVideoPostMidiaController
);

postsRoutes.delete(
  "/posts/upload/:filename/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Posts.default.deletePostMidiaController
);

postsRoutes.get("/posts");

postsRoutes.get("/posts/:post_id");

postsRoutes.patch("/posts/:post_id");

postsRoutes.delete("/posts/:post_id");
