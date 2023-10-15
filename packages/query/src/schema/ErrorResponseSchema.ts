import {z} from "@pico/utils";

export const ErrorResponseSchema = z.object({
    error: z.object({
        message: z.string().nullish(),
        code:    z.number(),
        paths:   z.record(z.union([z.record(z.string()).nullish(), z.string().nullish()])).nullish(),
    }),
});
export type ErrorResponseSchema = typeof ErrorResponseSchema;
export namespace ErrorResponseSchema {
    export type Type = z.infer<ErrorResponseSchema>;
}
