import {type FilterSchema} from "@use-pico/query";
import {type z}            from "@use-pico/utils";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumns<
    TColumns extends string,
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
> = Record<TColumns, ITableColumn<TSchema, TFilterSchema>>;
