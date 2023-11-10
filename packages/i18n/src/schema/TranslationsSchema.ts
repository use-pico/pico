import {
    type PicoSchema,
    schema
}                          from "@use-pico/schema";
import {TranslationSchema} from "./TranslationSchema";

export const TranslationsSchema = schema(z => z.object({
    translations: z.record(z.string, TranslationSchema),
}));
export type TranslationsSchema = typeof TranslationsSchema;
export namespace TranslationsSchema {
    export type Type = PicoSchema.Output<TranslationsSchema>;
}
