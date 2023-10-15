import {FilterSchema} from "@pico/query";
import {z}            from "@pico/utils";

export const JobFilterSchema = FilterSchema.merge(z.object({
    status:    z.number().nullish(),
    statusIn:  z.array(z.number()).nullish(),
    service:   z.string().nullish(),
    serviceIn: z.array(z.string()).nullish(),
    reference: z.string().nullish(),
    commit:    z.boolean().nullish(),
    userId:    z.string().nullish(),
    user:      z.boolean().nullish(),
}));
export type JobFilterSchema = typeof JobFilterSchema;
export namespace JobFilterSchema {
    export type Type = z.infer<JobFilterSchema>;
}
