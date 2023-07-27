import { Request, Response, query } from "express";
import { createMovieServices } from "../services/createMovie.services";
import {
  TMovieRequest,
  TMovieReturn,
  TMovieUpdateRequest,
} from "../interfaces/movies.interfaces";
import { readMoviesServices } from "../services/readMovies.services";
import { updateMovieServices } from "../services/updateMovie.services";
import { deleteMovieServices } from "../services/deleteMovie.services";

export const createMovieControllers = async (req: Request, res: Response) => {
  const data: TMovieRequest = req.body;

  const movie: TMovieReturn = await createMovieServices(data);

  return res.status(201).json(movie);
};

export const readMoviesControllers = async (req: Request, res: Response) => {
  const order: string | null = String(req.query.order);
  const sort: string | null = String(req.query.sort);
  const perPage: number | null = Number(req.query.perPage);
  const page = Number(req.query.page);

  const movieListReturn = await readMoviesServices(order, sort, perPage, page);

  return res.status(200).json(movieListReturn);
};

export const updateMovieControllers = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data: TMovieUpdateRequest = req.body;

  const movieReturn = await updateMovieServices(id, data);

  return res.status(200).json(movieReturn);
};

export const deleteMovieControllers = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteMovieServices(id);

  return res.status(204).send();
};
