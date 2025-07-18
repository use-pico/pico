import { z } from "zod";

export const FulltextSchema = z.strictObject({
	fulltext: z.string().optional(),
});

export type FulltextSchema = typeof FulltextSchema;

export namespace FulltextSchema {
	export type Type = z.infer<FulltextSchema>;
}
