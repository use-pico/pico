import { type z } from "zod";
import type { NullableSchema } from "../schema/NullableSchema";
import type { CursorSchema } from "./CursorSchema";
import type { FilterSchema } from "./FilterSchema";
import type { OrderBySchema } from "./OrderBySchema";

/**
 * Query schema defines shape of the query used to fetch data.
 *
 * @template TFilterSchema Filter schema used to filter data.
 * @template TOrderBySchema OrderBy schema used to order data.
 *
 * @group query
 *
 * @remarks
 * Basic idea of this schema is to define a standard way how to fetch data from the source. It should be used in all queries to provide consistent API.
 *
 * `Filter` is dynamic part fully available to the user, when `where` is filter defined by your application which cannot be change by the user.
 */
export type QuerySchema<
	TFilterSchema extends FilterSchema,
	TOrderBySchema extends OrderBySchema,
> = z.ZodObject<
	{
		/**
		 * User-land filter.
		 */
		filter: NullableSchema<TFilterSchema>;
		/**
		 * "Hard" filter, overrides "filter"; this is useful for bound queries (for example given `clientId` should not be changed).
		 */
		where: NullableSchema<TFilterSchema>;
		/**
		 * Order by schema.
		 */
		orderBy: NullableSchema<TOrderBySchema>;
		/**
		 * Paging support.
		 */
		cursor: NullableSchema<CursorSchema>;
	},
	"strip"
>;

export namespace QuerySchema {
	export type QueryType<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> = z.infer<TQuerySchema>;

	export type Filter<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> =
		TQuerySchema extends QuerySchema<infer TFilterSchema, OrderBySchema> ?
			TFilterSchema
		:	never;

	export type FilterType<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> = z.infer<Filter<TQuerySchema>>;

	export type OrderBy<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> =
		TQuerySchema extends QuerySchema<FilterSchema, infer TOrderBySchema> ?
			TOrderBySchema
		:	never;

	export type OrderByType<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> = z.infer<OrderBy<TQuerySchema>>;

	export type Order<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> = keyof NonNullable<OrderByType<TQuerySchema>>;
}
