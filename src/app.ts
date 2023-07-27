import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import { errorHandler } from "./error";
import { moviesRouters } from "./routers/movies.routers";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRouters);

app.use(errorHandler);

export default app;
