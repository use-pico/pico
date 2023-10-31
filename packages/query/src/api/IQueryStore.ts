import {type PicoSchema}    from "@use-pico/schema";
import {type IStore}        from "@use-pico/store";
import {type CursorSchema}  from "../schema/CursorSchema";
import {type FilterSchema}  from "../schema/FilterSchema";
import {type OrderBySchema} from "../schema/OrderBySchema";
import {type QuerySchema}   from "../schema/QuerySchema";

export type IQueryStore<
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
> = IStore<{
    schema: TQuerySchema;
    cursor: CursorSchema.Type;

    hasWhere(): boolean;
    hasFilter(): boolean;

    setCursor(page: number, size?: number): void;
    setSize(size: number): void;

    setFilter(filter: PicoSchema.Output<TQuerySchema["shape"]["filter"]>): void;
    shallowFilter(filter?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>): void;
    clearFilter(): void;
    isFilter(): boolean;

    setOrderBy(orderBy: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>): void;
    shallowOrderBy(orderBy?: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>): void;
}, {
    /**
     * If set, mandatory filters which user cannot change.
     *
     * Can be set only when a store is created (instance of store).
     */
    where?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>;
    /**
     * User-specific filters; "where" takes precedence.
     */
    filter?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>;
    orderBy?: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>;
}>;

export namespace IQueryStore {
    export type Store<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = IStore.Store<
        IQueryStore<TQuerySchema>
    >;
}
