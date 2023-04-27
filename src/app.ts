import "express-async-errors";
import express, { Application, json } from "express";
import { handleErros } from "./errors/erros";
import { usersRoutes } from "./routes/users.routes";
import { usersLoginRoutes } from "./routes/usersLogin.routes";
import cookieParser from "cookie-parser";
import { postsRoutes } from "./routes/posts.routes";

const app: Application = express();

app.use(json());
app.use(cookieParser());

app.use("", usersRoutes);
app.use("", usersLoginRoutes);
app.use("", postsRoutes);

app.use(handleErros);

export default app;
