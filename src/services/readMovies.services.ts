import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieArraySchemaReturn } from "../schemas/movies.schemas";

export const readMoviesServices = async (
  order: string | null,
  sort: string | null,
  perPage: number | null,
  page: number | null
) => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (!perPage || perPage < 0 || perPage > 5) {
    perPage = 5;
  }
  if (!page || page <= 0) {
    page = 1;
  }

  let configfind: FindManyOptions<Movie> = {
    order: { id: "asc" },
    skip: (page - 1) * perPage,
    take: perPage,
  };

  if (sort === "price") {
    configfind.order = { price: "asc" };
    if (order && order == "desc") {
      configfind.order = { price: "desc" };
    }
  }
  if (sort === "duration") {
    configfind.order = { duration: "asc" };
    if (order && order == "desc") {
      configfind.order = { duration: "desc" };
    }
  }

  const movies = await movieRepo.find(configfind);
  const count = await movieRepo.count();

  const returnMovies = movieArraySchemaReturn.parse(movies);

  let prevPageString: string | null = `http://localhost:3000/movies?page=${
    page - 1
  }&perPage=${perPage}`;

  let nextPageString: string | null = `http://localhost:3000/movies?page=${
    page + 1
  }&perPage=${perPage}`;

  if (page == 1) {
    prevPageString = null;
  } else {
    prevPageString = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  configfind.skip = page * perPage;
  const checkNextPageMoviesExists = await movieRepo.find(configfind);

  if (checkNextPageMoviesExists.length == 0) {
    nextPageString = null;
  }

  return {
    prevPage: prevPageString,
    nextPage: nextPageString,
    count: count,
    data: returnMovies,
  };
};
