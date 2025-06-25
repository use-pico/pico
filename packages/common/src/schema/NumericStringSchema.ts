import { z } from "zod";

export const NumericStringSchema = z
	.union([
		z.number(),
		z.string(),
	])
	.transform((v) => `${v}`);

export type NumericStringSchema = typeof NumericStringSchema;

export namespace NumericStringSchema {
	export type Type = z.infer<NumericStringSchema>;
}
