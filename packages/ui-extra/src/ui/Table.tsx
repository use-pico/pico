"use client";

import {type QuerySchema}        from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {Table as CoolTable}      from "@use-pico/table";
import {type ReactNode}          from "react";
import {RowAction}               from "./Table/RowAction";
import {TableAction}             from "./Table/TableAction";

export namespace Table {
    export interface Props<
        TColumns extends string,
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<any, any>,
    > extends CoolTable.Props<
        TColumns,
        TSchema,
        TQuerySchema
    > {
        name: string;
        icon: ReactNode;
        tableActionProps?: Omit<TableAction.Props, "name" | "icon">;
        rowActionProps?: Omit<RowAction.Props<TSchema>, "name" | "icon" | "item">;
    }
}

export const Table = <
    TColumns extends string,
    TSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        name,
        icon,
        tableActionProps,
        rowActionProps,
        ...props
    }: Table.Props<TColumns, TSchema, TQuerySchema>
) => {
    return <CoolTable
        WithTableAction={tableActionProps ? () => <TableAction
            icon={icon}
            name={name}
            {...tableActionProps}
        /> : undefined}
        WithRowAction={rowActionProps ? ({item}) => <RowAction
            icon={icon}
            name={name}
            item={item}
            {...rowActionProps}
        /> : undefined}
        {...props}
    />;
};
