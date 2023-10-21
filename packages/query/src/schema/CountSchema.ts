import {
    type PicoSchema,
    withNumber,
    withObject
} from "@use-pico/schema";

export const CountSchema = withObject({
    total: withNumber(),
    where: withNumber(),
    count: withNumber(),
});
export type CountSchema = typeof CountSchema;
export namespace CountSchema {
    export type Type = PicoSchema.Output<CountSchema>;
}
