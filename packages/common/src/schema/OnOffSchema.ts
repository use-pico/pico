import { z } from "zod";

export const OnOffSchema = z.union([
	z.boolean(),
	z.literal("on").transform(() => true),
	z.literal("off").transform(() => false),
]);

export type OnOffSchema = typeof OnOffSchema;

export namespace OnOffSchema {
	export type Type = z.infer<OnOffSchema>;
}
