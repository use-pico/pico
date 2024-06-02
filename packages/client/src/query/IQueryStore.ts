import {
    type CursorSchema,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                    from "@use-pico/common";
import {type z}      from "zod";
import type {IStore} from "../store/IStore";

export type IQueryStore<
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
> = IStore<{
	schema: TQuerySchema;

	hasWhere(): boolean;
	hasFilter(): boolean;

	setCursor(page: number, size?: number): void;
	setSize(size: number): void;

	setFilter(filter: z.infer<TQuerySchema["shape"]["filter"]>): void;
	shallowFilter(filter?: z.infer<TQuerySchema["shape"]["filter"]>): void;
	clearFilter(): void;
	isFilter(): boolean;

	setOrderBy(orderBy: z.infer<TQuerySchema["shape"]["orderBy"]>): void;
	shallowOrderBy(orderBy?: z.infer<TQuerySchema["shape"]["orderBy"]>): void;
}, {
	/**
	 * If set, mandatory filters which user cannot change.
	 *
	 * Can be set only when a store is created (instance of store).
	 */
	where?: z.infer<TQuerySchema["shape"]["filter"]>;
	/**
	 * User-specific filters; "where" takes precedence.
	 */
	filter?: z.infer<TQuerySchema["shape"]["filter"]>;
	orderBy?: z.infer<TQuerySchema["shape"]["orderBy"]>;
	cursor?: CursorSchema.Type | null;
}>;

export namespace IQueryStore {
	export type Store<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> = IStore.Store<
		IQueryStore<TQuerySchema>
	>;
}
