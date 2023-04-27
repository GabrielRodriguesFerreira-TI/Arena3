import { Router } from "express";
import * as Middlewares from "../middlewares/index";
import * as Posts from "../controllers/posts/index";
import { videoUploadRateLimit } from "../config/videoRateLimit.config";

export const postsRoutes: Router = Router();

postsRoutes.post("/posts");

postsRoutes.patch(
  "/posts/upload/:type/:user_id",
  Middlewares.tokenValidationMiddleware,
  Middlewares.verifyIdExistsMiddlewares,
  Middlewares.verifyPermissionMiddlewares,
  videoUploadRateLimit,
  Posts.default.uploadPostMidiaController
);

postsRoutes.delete("/posts/upload/:filename/:user_id");

postsRoutes.get("/posts");

postsRoutes.get("/posts/:post_id");

postsRoutes.patch("/posts/:post_id");

postsRoutes.delete("/posts/:post_id");
