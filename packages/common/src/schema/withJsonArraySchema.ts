import { z } from "zod";

export const withJsonArraySchema = <TSchema extends z.ZodSchema>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.refine((values) => Array.isArray(values))
		.transform((values) => z.array(schema).parse(values));
};
