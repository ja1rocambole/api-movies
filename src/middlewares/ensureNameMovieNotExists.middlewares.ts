import { NextFunction, Request, Response } from "express";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureNameMovieNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieRequest: TMovieRequest = req.body;

  if (movieRequest.name) {
    const movieNameExits = await movieRepo.findOne({
      where: { name: movieRequest.name },
    });

    if (movieNameExits) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  next();
};
