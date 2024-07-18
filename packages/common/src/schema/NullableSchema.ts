import type { z } from "zod";

export type NullableSchema<TSchema extends z.ZodSchema> = z.ZodOptional<
	z.ZodNullable<TSchema>
>;
