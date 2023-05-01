import { Router } from "express";
import * as Middlewares from "../middlewares/index";
import * as Posts from "../controllers/posts/index";
import { midiaUploadRateLimit } from "../config/midiaRateLimit.config";
import postMidiaMulter from "../config/postMidia.multer";
import multer from "multer";

export const postsRoutes: Router = Router();
const upload = multer(postMidiaMulter.config);

postsRoutes.post(
  "/posts/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  Posts.default.createPostController
);

postsRoutes.patch(
  "/posts/upload/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  midiaUploadRateLimit,
  upload.single("midia"),
  Posts.default.uploadMidiaPostController
);

postsRoutes.get("/posts");

postsRoutes.get("/posts/:post_id");

postsRoutes.patch("/posts/:post_id");

postsRoutes.delete("/posts/:post_id");
