import {type WithFindByQuery}  from "@use-pico/rpc";
import {type z}                from "@use-pico/utils";
import {type JobFilterSchema}  from "../schema/JobFilterSchema";
import {type JobOrderBySchema} from "../schema/JobOrderBySchema";
import {type JobSchema}        from "../schema/JobSchema";

export type IWithJobFindByQuery = WithFindByQuery<
    z.ZodOptional<
        z.ZodNullable<JobSchema>
    >,
    JobFilterSchema,
    JobOrderBySchema
>;
