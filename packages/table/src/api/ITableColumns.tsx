import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                          from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumns<
    TColumns extends string,
    TSchema extends PicoSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = Record<TColumns, ITableColumn<TSchema, TQuerySchema>>;
