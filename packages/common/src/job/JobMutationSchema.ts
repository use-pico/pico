import {type z}             from "zod";
import {withMutationSchema} from "../query/withMutationSchema";
import {JobQuerySchema}     from "./JobQuerySchema";
import {JobShapeSchema}     from "./JobShapeSchema";

export const JobMutationSchema = withMutationSchema({
    shape: JobShapeSchema,
    query: JobQuerySchema,
});
export type JobMutationSchema = typeof JobMutationSchema;
export namespace JobMutationSchema {
    export type Type = z.infer<JobMutationSchema>;
}
