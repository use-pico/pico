import {type Schema}        from "@use-pico/schema";
import {type IStoreProps}   from "@use-pico/store";
import {type CursorSchema}  from "../schema/CursorSchema";
import {type FilterSchema}  from "../schema/FilterSchema";
import {type OrderBySchema} from "../schema/OrderBySchema";

export type IQueryStoreProps<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = IStoreProps<{
    schema: {
        filter: TFilterSchema;
        orderBy: TOrderBySchema;
    };
    /**
     * If set, mandatory filters which user cannot change.
     *
     * Can be set only when a store is created (instance of store).
     */
    where?: Schema.Output<TFilterSchema>;
    /**
     * User-specific filters; "where" takes precedence.
     */
    filter?: Schema.Output<TFilterSchema>;
    orderBy?: Schema.Output<TOrderBySchema>;
    cursor: CursorSchema.Type;

    hasWhere(): boolean;
    hasFilter(): boolean;

    setCursor(page: number, size?: number): void;
    setSize(size: number): void;

    setFilter(filter: Schema.Output<TFilterSchema>): void;
    shallowFilter(filter?: Schema.Output<TFilterSchema>): void;
    clearFilter(): void;
    isFilter(): boolean;

    setOrderBy(orderBy: Schema.Output<TOrderBySchema>): void;
    shallowOrderBy(orderBy?: Schema.Output<TOrderBySchema>): void;
}>;
