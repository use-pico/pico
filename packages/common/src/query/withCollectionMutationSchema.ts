import {z}                             from "zod";
import type {ShapeSchema}              from "../schema/ShapeSchema";
import type {CollectionMutationSchema} from "./CollectionMutationSchema";
import type {FilterSchema}             from "./FilterSchema";
import type {OrderBySchema}            from "./OrderBySchema";
import type {QuerySchema}              from "./QuerySchema";

export namespace withCollectionMutationSchema {
	export interface Props<
		TShapeSchema extends ShapeSchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		shape: TShapeSchema;
		query: TQuerySchema;
	}
}

export type withCollectionMutationSchema<
	TShapeSchema extends ShapeSchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = typeof withCollectionMutationSchema<TShapeSchema, TQuerySchema>;

export const withCollectionMutationSchema = <
	TShapeSchema extends ShapeSchema,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
	{
		shape,
		query,
	}: withCollectionMutationSchema.Props<
		TShapeSchema,
		TQuerySchema
	>,
): CollectionMutationSchema<TShapeSchema, TQuerySchema> => {
	return z.object({
		patch:  z.object({
			with: shape.partial(),
			query,
		}).optional(),
		delete: query.optional(),
	}) as CollectionMutationSchema<TShapeSchema, TQuerySchema>;
};
