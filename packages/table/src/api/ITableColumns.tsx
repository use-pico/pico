import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                          from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumns<
    TColumns extends string,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends PicoSchema,
> = Record<TColumns, ITableColumn<TQuerySchema, TSchema>>;
