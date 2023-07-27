import { z } from "zod";

export const movieSchemaReturn = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullable().default("null"),
  duration: z.number().min(1, "Number must be greater than 0").int(),
  price: z.number().min(1, "Number must be greater than 0").int(),
});

export const movieArraySchemaReturn = movieSchemaReturn.array();
export const movieSchemaRequest = movieSchemaReturn.omit({ id: true });

export const movieUpdateSchemaRequest = movieSchemaRequest.partial();
