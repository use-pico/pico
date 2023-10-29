import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const TranslationSchema = schema(z => z.object({
    translations: z.record(z.string, z.any),
}));
export type TranslationSchema = typeof TranslationSchema;
export namespace TranslationSchema {
    export type Type = PicoSchema.Output<TranslationSchema>;
}
