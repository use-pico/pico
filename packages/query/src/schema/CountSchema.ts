import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const CountSchema = schema(z => z.object({
    total: z.number,
    where: z.number,
    count: z.number,
}));
export type CountSchema = typeof CountSchema;
export namespace CountSchema {
    export type Type = PicoSchema.Output<CountSchema>;
}
