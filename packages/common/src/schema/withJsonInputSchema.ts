import type { z } from "zod";

export const withJsonInputSchema = <TSchema extends z.ZodTypeAny>(
	schema: TSchema,
) => {
	return schema.transform((v) =>
		v === undefined ? "null" : JSON.stringify(v),
	);
};
