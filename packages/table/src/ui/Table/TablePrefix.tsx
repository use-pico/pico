import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                               from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TablePrefix {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > {
        WithPrefix?: WithPrefix<TQuerySchema, TSchema>;
        items?: PicoSchema.Output<TSchema>[];
        columns: ITableColumnTuple<TQuerySchema, TSchema>[];
    }

    export type WithPrefix<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > = FC<WithPrefixProps<TQuerySchema, TSchema>>;

    export interface WithPrefixProps<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TQuerySchema, TSchema>[];
    }
}

export const TablePrefix = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends PicoSchema,
>(
    {
        WithPrefix,
        items,
        columns,
    }: TablePrefix.Props<TQuerySchema, TSchema>
) => {
    return WithPrefix ? <WithPrefix
        items={items}
        columns={columns.map(([, column]) => column)}
    /> : null;
};
