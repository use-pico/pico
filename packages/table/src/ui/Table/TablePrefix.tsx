import {type FilterSchema}      from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TablePrefix {
    export interface Props<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > {
        WithPrefix?: WithPrefix<TSchema, TFilterSchema>;
        items?: PicoSchema.Output<TSchema>[];
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
    }

    export type WithPrefix<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > = FC<WithPrefixProps<TSchema, TFilterSchema>>;

    export interface WithPrefixProps<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TSchema, TFilterSchema>[];
    }
}

export const TablePrefix = <
    TSchema extends PicoSchema,
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
