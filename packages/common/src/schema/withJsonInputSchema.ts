import type { z } from "zod";

export const withJsonInputSchema = <TSchema extends z.ZodTypeAny>(
	schema: TSchema,
) => {
	return schema
		.nullable()
		.default(null)
		.transform((v) => JSON.stringify(v));
};
