import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const JobSchema = schema(z => z.object({
    id:           z.nonEmptyString,
    service:      z.nonEmptyString,
    reference:    z.string$,
    status:       z.number,
    total:        z.number,
    progress:     z.any,
    successCount: z.number,
    errorCount:   z.number,
    skipCount:    z.number,
    request:      z.any$,
    response:     z.any$,
    started:      z.string,
    finished:     z.string$,
    commit:       z.bool,
    userId:       z.nonEmptyString,
}));
export type JobSchema = typeof JobSchema;
export namespace JobSchema {
    export type Type = PicoSchema.Output<JobSchema>;
}
