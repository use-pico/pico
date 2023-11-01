import {withQuerySchema}  from "@use-pico/query";
import {type PicoSchema}  from "@use-pico/schema";
import {JobFilterSchema}  from "./JobFilterSchema";
import {JobOrderBySchema} from "./JobOrderBySchema";

export const JobQuerySchema = withQuerySchema({
    filter:  JobFilterSchema,
    orderBy: JobOrderBySchema,
});
export type JobQuerySchema = typeof JobQuerySchema;
export namespace JobQuerySchema {
    export type Type = PicoSchema.Output<JobQuerySchema>;
}
