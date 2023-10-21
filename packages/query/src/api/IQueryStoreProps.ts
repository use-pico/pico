import {type PicoSchema}    from "@use-pico/schema";
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
    where?: PicoSchema.Output<TFilterSchema>;
    /**
     * User-specific filters; "where" takes precedence.
     */
    filter?: PicoSchema.Output<TFilterSchema>;
    orderBy?: PicoSchema.Output<TOrderBySchema>;
    cursor: CursorSchema.Type;

    hasWhere(): boolean;
    hasFilter(): boolean;

    setCursor(page: number, size?: number): void;
    setSize(size: number): void;

    setFilter(filter: PicoSchema.Output<TFilterSchema>): void;
    shallowFilter(filter?: PicoSchema.Output<TFilterSchema>): void;
    clearFilter(): void;
    isFilter(): boolean;

    setOrderBy(orderBy: PicoSchema.Output<TOrderBySchema>): void;
    shallowOrderBy(orderBy?: PicoSchema.Output<TOrderBySchema>): void;
}>;
