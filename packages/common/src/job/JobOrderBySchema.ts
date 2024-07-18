import {z}           from "zod";
import {OrderSchema} from "../query/OrderSchema";

export const JobOrderBySchema = z.object({
	created: OrderSchema,
	status:  OrderSchema,
}).partial();
export type JobOrderBySchema = typeof JobOrderBySchema;
export namespace JobOrderBySchema {
	export type Type = z.infer<JobOrderBySchema>;
}
