import {
    type FilterSchema,
    OrderBySchema,
    QuerySchema
}                               from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TablePrefix {
    export interface Props<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        WithPrefix?: WithPrefix<TSchema, TQuerySchema>;
        items?: PicoSchema.Output<TSchema>[];
        columns: ITableColumnTuple<TSchema, TQuerySchema>[];
    }

    export type WithPrefix<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = FC<WithPrefixProps<TSchema, TQuerySchema>>;

    export interface WithPrefixProps<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TSchema, TQuerySchema>[];
    }
}

export const TablePrefix = <
    TSchema extends PicoSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        WithPrefix,
        items,
        columns,
    }: TablePrefix.Props<TSchema, TQuerySchema>
) => {
    return WithPrefix ? <WithPrefix
        items={items}
        columns={columns.map(([, column]) => column)}
    /> : null;
};
