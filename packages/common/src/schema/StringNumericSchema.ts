import { z } from "zod";

export const StringNumericSchema = z.union([
	z.number(),
	z.string().transform((v) => parseFloat(v)),
]);

export type StringNumericSchema = typeof StringNumericSchema;

export namespace StringNumericSchema {
	export type Type = z.infer<StringNumericSchema>;
}
