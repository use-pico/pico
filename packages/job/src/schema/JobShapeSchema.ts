import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const JobShapeSchema = schema(z => z.object({
    id:           z.string().nonEmpty(),
    service:      z.string().nonEmpty(),
    reference:    z.string().nullish(),
    status:       z.number(),
    total:        z.number(),
    progress:     z.any(),
    successCount: z.number(),
    errorCount:   z.number(),
    skipCount:    z.number(),
    request:      z.any().nullish(),
    response:     z.any().nullish(),
    started:      z.string(),
    finished:     z.string().nullish(),
    commit:       z.bool(),
    userId:       z.string().nonEmpty(),
}));
export type JobShapeSchema = typeof JobShapeSchema;
export namespace JobShapeSchema {
    export type Type = PicoSchema.Output<JobShapeSchema>;
}
