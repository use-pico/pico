import {type z}                 from "zod";
import {withQuerySchema}        from "../query/withQuerySchema";
import {SpotlightFilterSchema}  from "./SpotlightFilterSchema";
import {SpotlightOrderBySchema} from "./SpotlightOrderBySchema";

export const SpotlightQuerySchema = withQuerySchema({
	filter:  SpotlightFilterSchema,
	orderBy: SpotlightOrderBySchema,
});
export type SpotlightQuerySchema = typeof SpotlightQuerySchema;
export namespace SpotlightQuerySchema {
	export type Type = z.infer<SpotlightQuerySchema>;
}
