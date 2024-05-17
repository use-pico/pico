import {z} from "zod";

export const ErrorSchema = z.object({
    error: z.object({
        message: z.string().optional(),
        code:    z.number(),
        paths:   z.record(
            z.union([
                z.record(z.string()).nullable(),
                z.string(),
            ])
        ).optional(),
    }),
});
export type ErrorSchema = typeof ErrorSchema;
export namespace ErrorSchema {
    export type Type = z.infer<ErrorSchema>;
}
