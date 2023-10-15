import {type FilterSchema}      from "@pico/query";
import {Table}                  from "@pico/ui";
import {type z}                 from "@pico/utils";
import {type FC}                from "react";
import {type ITableColumn}      from "../../api/ITableColumn";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TableFoot {
    export interface Props<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        WithFooter?: WithFooter<TSchema, TFilterSchema>;
        withTableAction: boolean;
        withRowAction: boolean;
        disableActions: boolean;
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
        items?: z.infer<TSchema>[];
    }

    export type WithFooter<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > = FC<WithFooterProps<TSchema, TFilterSchema>>;

    export interface WithFooterProps<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        items?: z.infer<TSchema>[];
        columns?: ITableColumn<TSchema, TFilterSchema>[];
    }
}

export const TableFoot = <
    TSchema extends z.ZodSchema,
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
