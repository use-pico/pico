import {type PicoSchema}    from "@use-pico/schema";
import {withMutationSchema} from "@use-pico/source";
import {JobQuerySchema}     from "./JobQuerySchema";
import {JobShapeSchema}     from "./JobShapeSchema";

export const JobMutationSchema = withMutationSchema({
    shape: JobShapeSchema,
    query: JobQuerySchema,
});
export type JobMutationSchema = typeof JobMutationSchema;
export namespace JobMutationSchema {
    export type Type = PicoSchema.Output<JobMutationSchema>;
}
