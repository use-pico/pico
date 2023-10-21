import {type WithFindByQuery}  from "@use-pico/rpc";
import {type NullishSchema}    from "@use-pico/schema";
import {type JobFilterSchema}  from "../schema/JobFilterSchema";
import {type JobOrderBySchema} from "../schema/JobOrderBySchema";
import {type JobSchema}        from "../schema/JobSchema";

export type IWithJobFindByQuery = WithFindByQuery<
    NullishSchema<JobSchema>,
    JobFilterSchema,
    JobOrderBySchema
>;
