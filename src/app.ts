import "express-async-errors";
import express, { Application, json } from "express";
import { handleErros } from "./errors/erros";
import { usersRoutes } from "./routes/users.routes";
import { usersLoginRoutes } from "./routes/usersLogin.routes";

const app: Application = express();

app.use(json());

app.use("", usersRoutes);
app.use("", usersLoginRoutes);

app.use(handleErros);

export default app;
