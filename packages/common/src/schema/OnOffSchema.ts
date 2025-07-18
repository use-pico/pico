import { z } from "zod";
import { translator } from "../i18n/translator";

export const OnOffSchema = z.union(
	[
		z.boolean(),
		z.literal("on").transform(() => true),
		z.literal("off").transform(() => false),
	],
	{
		error({ input }) {
			return translator.text("Invalid on/off value", input as any);
		},
	},
);

export type OnOffSchema = typeof OnOffSchema;

export namespace OnOffSchema {
	export type Type = z.infer<OnOffSchema>;
}
