import { z } from "zod";
import { TranslationSchema } from "./TranslationSchema";

export const TranslationListSchema = z.record(z.string(), TranslationSchema);

export type TranslationListSchema = typeof TranslationListSchema;

export namespace TranslationListSchema {
	export type Type = z.infer<typeof TranslationListSchema>;
}
