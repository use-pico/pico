import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const NodeSchema = schema(z => z.object({
    id:    z.nonEmptyString,
    label: z.nonEmptyString,
    title: z.string$,
    color: z.string$,
}));
export type NodeSchema = typeof NodeSchema;
export namespace NodeSchema {
    export type Type = PicoSchema.Output<NodeSchema>;
}
