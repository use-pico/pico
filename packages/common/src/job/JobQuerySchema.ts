import {type z}           from "zod";
import {withQuerySchema}  from "../query/withQuerySchema";
import {JobFilterSchema}  from "./JobFilterSchema";
import {JobOrderBySchema} from "./JobOrderBySchema";

export const JobQuerySchema = withQuerySchema({
    filter: JobFilterSchema,
	orderBy: JobOrderBySchema,
});
export type JobQuerySchema = typeof JobQuerySchema;
export namespace JobQuerySchema {
	export type Type = z.infer<JobQuerySchema>;
}
