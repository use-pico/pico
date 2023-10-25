import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const JobFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        status:    z.number$,
        statusIn:  z.array(z.number).nullish(),
        service:   z.string$,
        serviceIn: z.array(z.string).nullish(),
        reference: z.string$,
        commit:    z.bool$,
        userId:    z.string$,
        user:      z.bool$,
    })),
]);
export type JobFilterSchema = typeof JobFilterSchema;
export namespace JobFilterSchema {
    export type Type = PicoSchema.Output<JobFilterSchema>;
}
