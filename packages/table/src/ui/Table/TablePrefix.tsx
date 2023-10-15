import {type FilterSchema}      from "@use-pico/query";
import {type z}                 from "@use-pico/utils";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TablePrefix {
    export interface Props<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        WithPrefix?: WithPrefix<TSchema, TFilterSchema>;
        items?: z.infer<TSchema>[];
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
    }

    export type WithPrefix<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > = FC<WithPrefixProps<TSchema, TFilterSchema>>;

    export interface WithPrefixProps<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        items?: z.infer<TSchema>[];
        columns?: ITableColumn<TSchema, TFilterSchema>[];
    }
}

export const TablePrefix = <
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
>(
    {
        WithPrefix,
        items,
        columns,
    }: TablePrefix.Props<TSchema, TFilterSchema>
) => {
    return WithPrefix ? <WithPrefix
        items={items}
        columns={columns.map(([, column]) => column)}
    /> : null;
};
