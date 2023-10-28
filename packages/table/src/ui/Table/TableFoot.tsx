import {
    type FilterSchema,
    OrderBySchema,
    QuerySchema
}                               from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {Table}                  from "@use-pico/ui";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TableFoot {
    export interface Props<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        WithFooter?: WithFooter<TSchema, TQuerySchema>;
        withTableAction: boolean;
        withRowAction: boolean;
        disableActions: boolean;
        columns: ITableColumnTuple<TSchema, TQuerySchema>[];
        items?: PicoSchema.Output<TSchema>[];
    }

    export type WithFooter<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = FC<WithFooterProps<TSchema, TQuerySchema>>;

    export interface WithFooterProps<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TSchema, TQuerySchema>[];
    }
}

export const TableFoot = <
    TSchema extends PicoSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        WithFooter,
        withTableAction,
        withRowAction,
        disableActions,
        columns,
        items,
    }: TableFoot.Props<TSchema, TQuerySchema>
) => {
    return WithFooter ? <Table.Tfoot>
        <Table.Tr>
            {!disableActions && (withTableAction || withRowAction) && <Table.Td/>}
            <WithFooter
                items={items}
                columns={columns.map(([, column]) => column)}
            />
        </Table.Tr>
    </Table.Tfoot> : null;
};
