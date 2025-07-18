import { z } from "zod";

export const withJsonOutputSchema = <TSchema extends z.core.$ZodType>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.pipe(schema);
};
