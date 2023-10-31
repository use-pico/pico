import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                               from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {Table}                  from "@use-pico/ui";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TableFoot {
    export interface Props<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > {
        WithFooter?: WithFooter<TQuerySchema, TSchema>;
        withTableAction: boolean;
        withRowAction: boolean;
        disableActions: boolean;
        columns: ITableColumnTuple<TQuerySchema, TSchema>[];
        items?: PicoSchema.Output<TSchema>[];
    }

    export type WithFooter<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > = FC<WithFooterProps<TQuerySchema, TSchema>>;

    export interface WithFooterProps<
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends PicoSchema,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TQuerySchema, TSchema>[];
    }
}

export const TableFoot = <
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends PicoSchema,
>(
    {
        WithFooter,
        withTableAction,
        withRowAction,
        disableActions,
        columns,
        items,
    }: TableFoot.Props<TQuerySchema, TSchema>
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
