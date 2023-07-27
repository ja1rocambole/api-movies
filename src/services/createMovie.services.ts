import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import {
  movieSchemaRequest,
  movieSchemaReturn,
} from "../schemas/movies.schemas";
import { TMovieRequest } from "../interfaces/movies.interfaces";

export const createMovieServices = async (payload: TMovieRequest) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const newMovie = movieRepo.create(payload);

  await movieRepo.save(newMovie);

  return movieSchemaReturn.parse(newMovie);
};
