import { z } from "zod";
import { TranslationSchema } from "./TranslationSchema";

export const TranslationListSchema = z.record(TranslationSchema);

export type TranslationListSchema = typeof TranslationListSchema;

export namespace TranslationListSchema {
	export type Type = z.infer<typeof TranslationListSchema>;
}
