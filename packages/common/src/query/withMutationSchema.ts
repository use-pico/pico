import {z}                   from "zod";
import type {ShapeSchema}    from "../schema/ShapeSchema";
import type {FilterSchema}   from "./FilterSchema";
import type {MutationSchema} from "./MutationSchema";
import type {OrderBySchema}  from "./OrderBySchema";
import type {QuerySchema}    from "./QuerySchema";

export namespace withMutationSchema {
	export interface Props<
		TShapeSchema extends ShapeSchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		shape: TShapeSchema;
		query: TQuerySchema;
	}
}

export type withMutationSchema<
	TShapeSchema extends ShapeSchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = typeof withMutationSchema<TShapeSchema, TQuerySchema>;

export const withMutationSchema = <
	TShapeSchema extends ShapeSchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	{
		shape,
		query,
	}: withMutationSchema.Props<
		TShapeSchema,
		TQuerySchema
	>,
): MutationSchema<TShapeSchema, TQuerySchema> => {
	return z.object({
		create: shape.optional(),
		update: z.object({
			with: shape,
			query,
		}).optional(),
		patch:  z.object({
			with: shape.partial(),
			query,
		}).optional(),
		upsert: z.object({
			with:  shape.partial(),
			query: query.optional(),
		}).optional(),
		delete: query.optional(),
	}) as MutationSchema<TShapeSchema, TQuerySchema>;
};
