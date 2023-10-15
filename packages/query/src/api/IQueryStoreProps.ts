import {type IStoreProps}   from "@use-pico/store";
import {type z}             from "@use-pico/utils";
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
    where?: z.infer<TFilterSchema>;
    /**
     * User-specific filters; "where" takes precedence.
     */
    filter?: z.infer<TFilterSchema>;
    orderBy?: z.infer<TOrderBySchema>;
    cursor: CursorSchema.Type;

    hasWhere(): boolean;
    hasFilter(): boolean;

    setCursor(page: number, size?: number): void;
    setSize(size: number): void;

    setFilter(filter: z.infer<TFilterSchema>): void;
    shallowFilter(filter?: z.infer<TFilterSchema>): void;
    clearFilter(): void;
    isFilter(): boolean;

    setOrderBy(orderBy: z.infer<TOrderBySchema>): void;
    shallowOrderBy(orderBy?: z.infer<TOrderBySchema>): void;
}>;
