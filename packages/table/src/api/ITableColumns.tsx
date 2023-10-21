import {type FilterSchema} from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumns<
    TColumns extends string,
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
> = Record<TColumns, ITableColumn<TSchema, TFilterSchema>>;
