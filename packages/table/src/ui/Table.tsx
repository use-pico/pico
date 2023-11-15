"use client";

import {Pagination}              from "@use-pico/pagination";
import {
    type IQueryStore,
    type QuerySchema
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {
    type IWithSourceQuery,
    useQuery
}                                from "@use-pico/source";
import {
    LinkLockProvider,
    Progress,
    Table as CoolTable
}                                from "@use-pico/ui";
import {
    type CSSProperties,
    type FC,
    PropsWithChildren,
    type ReactNode
}                                from "react";
import {type ITableColumns}      from "../api/ITableColumns";
import {type ITableColumnTuple}  from "../api/ITableColumnTuple";
import classes                   from "./Table.module.css";
import {BottomPagination}        from "./Table/BottomPagination";
import {TableBody}               from "./Table/TableBody";
import {TableCountResult}        from "./Table/TableCountResult";
import {TableFoot}               from "./Table/TableFoot";
import {TableHead}               from "./Table/TableHead";
import {TableHeaderControls}     from "./Table/TableHeaderControls";
import {TablePrefix}             from "./Table/TablePrefix";

export namespace Table {
    export interface Props<
        TColumns extends string,
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<any, any>,
    > extends Partial<Omit<CoolTable.Props, "hidden" | "onClick">>,
        Omit<TableHeaderControls.Props<TQuerySchema, TSchema>, "isFetching" | "text">,
        Omit<TablePrefix.Props<TQuerySchema, TSchema>, "columns" | "items">,
        Omit<TableHead.Props<TQuerySchema, TSchema>, "columns" | "withRowAction" | "disableActions" | "items">,
        Omit<TableBody.Props<TQuerySchema, TSchema>, "columns" | "WithRow" | "withTableAction" | "disableActions">,
        Omit<TableFoot.Props<TQuerySchema, TSchema>, "columns" | "withTableAction" | "withRowAction" | "disableActions" | "items">,
        Omit<TableCountResult.Props<TQuerySchema, TSchema>, "text"> {
        text: {
            total: ReactNode;
            header?: TableHeaderControls.Props<TQuerySchema, TSchema>["text"];
            count?: TableCountResult.Props<TQuerySchema, TSchema>["text"];
        };
        /**
         * Define table columns; they will be rendered by default in the specified order
         */
        columns: ITableColumns<TColumns, TQuerySchema, TSchema>;
        /**
         * You can override some columns if you need to
         */
        overrideColumns?: Partial<ITableColumns<TColumns, TQuerySchema, TSchema>>;
        /**
         * If a table is long, you can specify scroll area
         */
        scrollWidth?: number | null;
        /**
         * Mark the given columns as hidden
         */
        hidden?: TColumns[];
        /**
         * Specify an order of columns
         */
        order?: TColumns[];
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;

        WithRow?: FC<TableBody.RowProps<TSchema>>;
        WithPostfix?: TableHeaderControls.Props<TQuerySchema, TSchema>["Postfix"];

        disableActions?: boolean;

        pagination?: {
            hideOnSingle?: boolean;
            /**
             * Where to put pagination, defaults to ["bottom","top"]
             */
            position?: ("top" | "bottom")[];

            props?: Omit<Pagination.Props<TQuerySchema>, "withSourceQuery" | "withQueryStore">;
        };

        withLinkLock?: boolean;
        refresh?: number;
        minWidth?: CSSProperties["minWidth"];
        compact?: boolean;
    }

    export type Classes = typeof classes;
}

export const Table = <
    TColumns extends string,
    TSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        text,
        columns,
        overrideColumns,
        scrollWidth,
        hidden,
        order,
        withQueryStore,
        withSourceQuery,
        WithTableAction,
        WithRowAction,
        WithRow,
        WithPostfix,
        Empty,
        Filter,
        highlight,
        WithPrefix,
        WithFooter,
        disableActions = false,
        SelectionStore,
        MultiSelectionStore,
        pagination,
        onClick,
        withLinkLock = false,
        refresh,
        compact = false,
        ...props
    }: Table.Props<TColumns, TSchema, TQuerySchema>) => {
    const $order = order || Object.keys(columns) as TColumns[];
    const $pagination = pagination || {
        position: ["top", "bottom"],
        props:    {
            hideOnSingle: true,
        }
    };

    /**
     * Do not memo this, or memo carefully! Changing this breaks column sorting and maybe something else too.
     */
    const $columns: ITableColumnTuple<TQuerySchema, TSchema>[] = $order.filter(column => !hidden?.includes(column)).map(column => [
        column,
        overrideColumns?.[column] || columns[column],
    ]);

    const result = useQuery({
        store: withQueryStore,
        withSourceQuery,
        refetchInterval: refresh,
    });

    const Wrap: FC<PropsWithChildren> = (scrollWidth ? ({children}) => <CoolTable.ScrollContainer
        minWidth={scrollWidth || 1200}
    >{children}</CoolTable.ScrollContainer> : ({children}) => children);

    return <LinkLockProvider
        isLock={withLinkLock}
    >
        {!compact && <TableHeaderControls
            isFetching={result.isFetching}
            withQueryStore={withQueryStore}
            withSourceQuery={withSourceQuery}
            Filter={Filter}
            Postfix={WithPostfix}
            text={text.header}
        />}
        {$pagination?.position?.includes("top") && <>
            <Pagination
                text={text}
                withQueryStore={withQueryStore}
                withSourceQuery={withSourceQuery}
                refresh={refresh}
                {...$pagination?.props}
            />
        </>}
        {(result.isFetching || result.isLoading) && <Progress radius={0} size={"xs"} value={100} animated/>}
        <TablePrefix
            WithPrefix={WithPrefix}
            items={result.data}
            columns={$columns}
        />
        <Wrap>
            <CoolTable
                striped
                highlightOnHover
                withTableBorder
                withRowBorders
                withColumnBorders
                stickyHeader
                {...props}
            >
                <TableHead
                    WithTableAction={WithTableAction}
                    columns={$columns}
                    withRowAction={!!WithRowAction}
                    disableActions={disableActions}
                    items={result.data}
                />
                <TableBody
                    withQueryStore={withQueryStore}
                    withSourceQuery={withSourceQuery}
                    columns={$columns}
                    withTableAction={!!WithTableAction}
                    WithRowAction={WithRowAction}
                    WithRow={WithRow || (props => <CoolTable.Tr{...props}/>)}
                    MultiSelectionStore={MultiSelectionStore}
                    SelectionStore={SelectionStore}
                    disableActions={disableActions}
                    highlight={highlight}
                    onClick={onClick}
                />
                <TableFoot
                    withTableAction={!!WithTableAction}
                    withRowAction={!!WithRowAction}
                    disableActions={disableActions}
                    columns={$columns}
                    items={result.data}
                    WithFooter={WithFooter}
                />
            </CoolTable>
        </Wrap>
        <TableCountResult
            withQueryStore={withQueryStore}
            withSourceQuery={withSourceQuery}
            Empty={Empty}
            text={text.count}
        />
        {$pagination?.position?.includes("bottom") && <>
            <BottomPagination
                text={text}
                refresh={refresh}
                withQueryStore={withQueryStore}
                withSourceQuery={withSourceQuery}
                props={$pagination?.props}
            />
        </>}
    </LinkLockProvider>;
};
