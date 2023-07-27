import { Router } from "express";
import {
  createMovieControllers,
  deleteMovieControllers,
  readMoviesControllers,
  updateMovieControllers,
} from "../controllers/movies.controllers";
import { validatedBodyMiddlewares } from "../middlewares/validatedBody.middlewares";
import {
  movieSchemaRequest,
  movieUpdateSchemaRequest,
} from "../schemas/movies.schemas";
import { ensureNameMovieNotExists } from "../middlewares/ensureNameMovieNotExists.middlewares";
import { ensureMovieIdExists } from "../middlewares/ensureMovieIdExists.middlewares";

export const moviesRouters: Router = Router();

moviesRouters.post(
  "",
  validatedBodyMiddlewares(movieSchemaRequest),
  ensureNameMovieNotExists,
  createMovieControllers
);

moviesRouters.get("", readMoviesControllers);

moviesRouters.patch(
  "/:id",
  validatedBodyMiddlewares(movieUpdateSchemaRequest),
  ensureMovieIdExists,
  ensureNameMovieNotExists,
  updateMovieControllers
);

moviesRouters.delete("/:id", ensureMovieIdExists, deleteMovieControllers);
