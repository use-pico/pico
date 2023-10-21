import {type FilterSchema}      from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {Table}                  from "@use-pico/ui";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TableFoot {
    export interface Props<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > {
        WithFooter?: WithFooter<TSchema, TFilterSchema>;
        withTableAction: boolean;
        withRowAction: boolean;
        disableActions: boolean;
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
        items?: PicoSchema.Output<TSchema>[];
    }

    export type WithFooter<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > = FC<WithFooterProps<TSchema, TFilterSchema>>;

    export interface WithFooterProps<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > {
        items?: PicoSchema.Output<TSchema>[];
        columns?: ITableColumn<TSchema, TFilterSchema>[];
    }
}

export const TableFoot = <
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
>(
    {
        WithFooter,
        withTableAction,
        withRowAction,
        disableActions,
        columns,
        items,
    }: TableFoot.Props<TSchema, TFilterSchema>
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
