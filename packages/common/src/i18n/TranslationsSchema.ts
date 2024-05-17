import {z}                 from "zod";
import {TranslationSchema} from "./TranslationSchema";

export const TranslationsSchema = z.object({
    translations: z.record(z.string(), TranslationSchema),
});
export type TranslationsSchema = typeof TranslationsSchema;
export namespace TranslationsSchema {
    export type Type = z.infer<TranslationsSchema>;
}
