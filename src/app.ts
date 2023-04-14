import "express-async-errors";
import express, { Application, json } from "express";
import { handleErros } from "./errors/erros";
import { usersRoutes } from "./routes/users.routes";

const app: Application = express();

app.use(json());

app.use("", usersRoutes);

app.use(handleErros);

export default app;
