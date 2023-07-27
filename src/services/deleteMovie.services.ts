import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const deleteMovieServices = async (id: number) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieFind = (await movieRepo.findOne({
    where: { id: id },
  })) as Movie;

  await movieRepo.remove(movieFind);
};
