import { z } from "zod";
import { translator } from "../i18n/translator";

export const withJsonOutputArraySchema = <TSchema extends z.core.$ZodType>(
	schema: TSchema,
) => {
	return z
		.string()
		.transform((value) => JSON.parse(value))
		.refine((values) => Array.isArray(values), {
			error() {
				return translator.text("JSON (input string) is not an array");
			},
		})
		.pipe(z.array(schema));
};
