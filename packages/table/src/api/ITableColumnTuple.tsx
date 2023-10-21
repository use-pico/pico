import {type FilterSchema} from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumnTuple<
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
> = [string, ITableColumn<TSchema, TFilterSchema>];
