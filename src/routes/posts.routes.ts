import { Router } from "express";

export const postsRoutes: Router = Router();

postsRoutes.post("/posts");

postsRoutes.patch("/posts/upload/:type/:user_id");

postsRoutes.delete("/posts/upload/:filename/:user_id");

postsRoutes.get("/posts");

postsRoutes.get("/posts/:post_id");

postsRoutes.patch("/posts/:post_id");

postsRoutes.delete("/posts/:post_id");
