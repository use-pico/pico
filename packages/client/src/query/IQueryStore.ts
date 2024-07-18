import {
	type CursorSchema,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
} from "@use-pico/common";
import type { IStore } from "../store/IStore";

export type IQueryStore<
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = IStore<
	{
		schema: {
			query: TQuerySchema;
			filter: QuerySchema.Filter<TQuerySchema>;
			orderBy: QuerySchema.OrderBy<TQuerySchema>;
		};

		hasWhere(): boolean;
		hasFilter(): boolean;

		setCursor(page: number, size?: number): void;
		setSize(size: number): void;

		setFilter(filter?: QuerySchema.FilterType<TQuerySchema> | null): void;
		shallowFilter(filter?: QuerySchema.FilterType<TQuerySchema> | null): void;
		clearFilter(): void;
		isFilter(): boolean;

		setOrderBy(orderBy: QuerySchema.OrderByType<TQuerySchema>): void;
		shallowOrderBy(orderBy?: QuerySchema.OrderByType<TQuerySchema>): void;
	},
	{
		/**
		 * If set, mandatory filters which user cannot change.
		 *
		 * Can be set only when a store is created (instance of store).
		 */
		where?: QuerySchema.FilterType<TQuerySchema> | null;
		/**
		 * User-specific filters; "where" takes precedence.
		 */
		filter?: QuerySchema.FilterType<TQuerySchema> | null;
		orderBy?: QuerySchema.OrderByType<TQuerySchema> | null;
		cursor?: CursorSchema.Type | null;
	}
>;

export namespace IQueryStore {
	export interface Store<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> extends IStore.Store<IQueryStore<TQuerySchema>> {}
}
