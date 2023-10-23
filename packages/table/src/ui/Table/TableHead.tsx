import {Translation}            from "@use-pico/i18n";
import {FilterSchema}           from "@use-pico/query";
import {type PicoSchema}        from "@use-pico/schema";
import {
    Group,
    Table
}                               from "@use-pico/ui";
import {isCallable}             from "@use-pico/utils";
import {
    type CSSProperties,
    type FC
}                               from "react";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";

export namespace TableHead {
    export interface Props<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
    > {
        /**
         * Component used to render actions over the whole table
         */
        WithTableAction?: FC<WithTableActionProps<TSchema>>;
        withRowAction: boolean;
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
        disableActions: boolean;
        items?: PicoSchema.Output<TSchema>[];
    }

    export interface WithTableActionProps<TSchema extends PicoSchema> {
        items?: PicoSchema.Output<TSchema>[];
    }
}

export const TableHead = <
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
>(
    {
        WithTableAction,
        withRowAction,
        columns,
        disableActions,
        items,
    }: TableHead.Props<TSchema, TFilterSchema>
) => {
    return <Table.Thead>
        <Table.Tr>
            {!disableActions && withRowAction && !WithTableAction && <Table.Th
                style={{
                    width: "2rem",
                }}
            />}
            {!disableActions && WithTableAction && <Table.Th
                style={{
                    width: "2rem",
                }}
            >
                {WithTableAction && <WithTableAction items={items}/>}
            </Table.Th>}
            {columns?.map(([name, column]) => {
                const defaultContent = <Translation
                    label={"table.column"}
                    withLabel={column?.title || name}
                />;
                const defaultStyle: CSSProperties = {
                    width: column.width ? `${column.width}rem` : undefined,
                };
                return <Table.Th
                    key={name}
                    style={(isCallable(column.headerStyle) ? column.headerStyle(defaultStyle) : column.headerStyle) || defaultStyle}
                    onClick={() => column.onHeaderClick?.()}
                >
                    <Group>
                        {column.headerRender?.(defaultContent) || defaultContent}
                    </Group>
                </Table.Th>;
            })}
        </Table.Tr>
    </Table.Thead>;
};