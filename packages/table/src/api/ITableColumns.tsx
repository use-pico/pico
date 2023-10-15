import {type FilterSchema} from "@pico/query";
import {type z}            from "@pico/utils";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumns<
    TColumns extends string,
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
> = Record<TColumns, ITableColumn<TSchema, TFilterSchema>>;
