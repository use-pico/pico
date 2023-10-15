import {type FilterSchema} from "@use-pico/query";
import {type z}            from "@use-pico/utils";
import {type ITableColumn} from "./ITableColumn";

export type ITableColumnTuple<
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
> = [string, ITableColumn<TSchema, TFilterSchema>];
