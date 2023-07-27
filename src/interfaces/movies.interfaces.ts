import { z } from "zod";
import {
  movieSchemaRequest,
  movieSchemaReturn,
} from "../schemas/movies.schemas";

export type TMovieReturn = z.infer<typeof movieSchemaReturn>;
export type TMovieRequest = z.infer<typeof movieSchemaRequest>;
export type TMovieUpdateRequest = Partial<TMovieRequest>;
