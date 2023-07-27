import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { movieSchemaReturn } from "../schemas/movies.schemas";
import {
  TMovieReturn,
  TMovieUpdateRequest,
} from "../interfaces/movies.interfaces";

export const updateMovieServices = async (
  id: number,
  payload: TMovieUpdateRequest
) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovie: Movie | null = await movieRepo.findOne({
    where: { id: id },
  });

  const newMovie: Movie = movieRepo.create({
    ...oldMovie,
    ...payload,
  });

  await movieRepo.save(newMovie);

  const returnMovie: TMovieReturn = movieSchemaReturn.parse(newMovie);

  return returnMovie;
};
