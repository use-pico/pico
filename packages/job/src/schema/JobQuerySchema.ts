import {CursorSchema}     from "@pico/query";
import {z}                from "@pico/utils";
import {JobFilterSchema}  from "./JobFilterSchema";
import {JobOrderBySchema} from "./JobOrderBySchema";

export const JobQuerySchema = z.object({
    where:   JobFilterSchema.nullish(),
    filter:  JobFilterSchema.nullish(),
    orderBy: JobOrderBySchema.nullish(),
    cursor:  CursorSchema.nullish(),
});
export type JobQuerySchema = typeof JobQuerySchema;
export namespace JobQuerySchema {
    export type Type = z.infer<JobQuerySchema>;
}
