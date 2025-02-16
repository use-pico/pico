import { z } from "zod";

export const withJsonOutputArraySchema = <TSchema extends z.ZodSchema>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.refine((values) => Array.isArray(values))
		.pipe(z.array(schema));
};
