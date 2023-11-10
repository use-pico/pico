import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const WithLocaleSchema = schema(z => z.object({
    locale: z.string,
}));
export type WithLocaleSchema = typeof WithLocaleSchema;
export namespace WithLocaleSchema {
    export type Type = PicoSchema.Output<WithLocaleSchema>;
}
