import {type PicoSchema} from "../api/PicoSchema";
import {schema}          from "../schema/schema";

export const ErrorSchema = schema(z => z.object({
    error: z.object({
        message: z.string$,
        code:    z.number,
        paths:   z.nullish(
            z.record(
                z.union([
                    z.nullish(z.record(z.string)),
                    z.string$,
                ])
            )
        ),
    }),
}));
export type ErrorSchema = typeof ErrorSchema;
export namespace ErrorSchema {
    export type Type = PicoSchema.Output<ErrorSchema>;
}
