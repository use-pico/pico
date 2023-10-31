import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                          from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumnTuple<
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends PicoSchema,
> = [string, ITableColumn<TQuerySchema, TSchema>];
