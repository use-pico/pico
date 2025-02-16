import { z } from "zod";

export const withJsonOutputSchema = <TSchema extends z.ZodSchema>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.pipe(schema);
};
