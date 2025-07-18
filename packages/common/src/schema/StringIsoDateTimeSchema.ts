import { DateTime } from "luxon";
import { z } from "zod";
import { translator } from "../i18n/translator";

export const StringIsoDateTimeSchema = z.union(
	[
		z.string(),
		z
			.date()
			.transform((v) => DateTime.fromJSDate(v).toISO())
			.refine((v) => v !== null),
	],
	{
		error({ input }) {
			return translator.text(
				"Cannot resolve iso date time",
				input as any,
			);
		},
	},
);

export type StringIsoDateTimeSchema = typeof StringIsoDateTimeSchema;

export namespace StringIsoDateTimeSchema {
	export type Type = z.infer<StringIsoDateTimeSchema>;
}
