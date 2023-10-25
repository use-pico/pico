import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const JobFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        status:    z.number().nullish(),
        statusIn:  z.array(z.number()).nullish(),
        service:   z.string().nullish(),
        serviceIn: z.array(z.string()).nullish(),
        reference: z.string().nullish(),
        commit:    z.bool().nullish(),
        userId:    z.string().nullish(),
        user:      z.bool().nullish(),
    })),
]);
export type JobFilterSchema = typeof JobFilterSchema;
export namespace JobFilterSchema {
    export type Type = PicoSchema.Output<JobFilterSchema>;
}
