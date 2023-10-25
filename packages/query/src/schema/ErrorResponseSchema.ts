import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const ErrorResponseSchema = schema(z => z.object({
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
export type ErrorResponseSchema = typeof ErrorResponseSchema;
export namespace ErrorResponseSchema {
    export type Type = PicoSchema.Output<ErrorResponseSchema>;
}
