import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const TranslationSchema = schema(z => z.object({
    ref: z.string$,
    value: z.string,
}));
export type TranslationSchema = typeof TranslationSchema;
export namespace TranslationSchema {
    export type Type = PicoSchema.Output<TranslationSchema>;
}
