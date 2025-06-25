import { DateTime } from "luxon";
import { z } from "zod";

export const StringIsoDateTimeSchema = z.union([
	z.string(),
	z
		.date()
		.transform((v) => DateTime.fromJSDate(v).toISO())
		.refine((v) => v !== null),
]);

export type StringIsoDateTimeSchema = typeof StringIsoDateTimeSchema;

export namespace StringIsoDateTimeSchema {
	export type Type = z.infer<StringIsoDateTimeSchema>;
}
