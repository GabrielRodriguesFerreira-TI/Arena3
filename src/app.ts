import "express-async-errors";
import express, { Application, json } from "express";
import { handleErros } from "./errors/erros";

const app: Application = express();

app.use(json());

app.use(handleErros);

export default app;
