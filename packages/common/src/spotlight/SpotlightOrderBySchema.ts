import {z}           from "zod";
import {OrderSchema} from "../query/OrderSchema";

export const SpotlightOrderBySchema = z.object({
	priority: OrderSchema,
	type:     OrderSchema,
});
export type SpotlightOrderBySchema = typeof SpotlightOrderBySchema;
export namespace SpotlightOrderBySchema {
	export type Type = z.infer<SpotlightOrderBySchema>;
}
