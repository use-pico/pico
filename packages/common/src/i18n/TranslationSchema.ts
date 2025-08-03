import { z } from "zod";

export const TranslationSchema = z.object({
	ref: z.string().optional(),
	value: z.string(),
	static: z.boolean().optional(),
});

export type TranslationSchema = typeof TranslationSchema;

export namespace TranslationSchema {
	export type Type = z.infer<TranslationSchema>;
}
