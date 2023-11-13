import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const EdgeSchema = schema(z => z.object({
    from:  z.nonEmptyString,
    to:    z.nonEmptyString,
    label: z.string$,
}));
export type EdgeSchema = typeof EdgeSchema;
export namespace EdgeSchema {
    export type Type = PicoSchema.Output<EdgeSchema>;
}
