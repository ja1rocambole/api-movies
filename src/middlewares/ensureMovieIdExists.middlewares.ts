import { NextFunction, Request, Response } from "express";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureMovieIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const idParams: number = Number(req.params.id);

  const idExists = await movieRepo.findOne({
    where: { id: idParams },
  });

  if (!idExists) {
    throw new AppError("Movie not found", 404);
  }

  next();
};
