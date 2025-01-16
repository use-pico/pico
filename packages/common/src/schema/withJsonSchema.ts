import { z } from "zod";

export const withJsonSchema = <TSchema extends z.ZodSchema>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.transform((values) => schema.parse(values));
};
