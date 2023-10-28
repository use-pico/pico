import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                          from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumnTuple<
    TSchema extends PicoSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = [string, ITableColumn<TSchema, TQuerySchema>];
