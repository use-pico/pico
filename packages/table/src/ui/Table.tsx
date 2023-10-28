import {
    type IWithTranslation,
    WithTranslationProvider
}                               from "@use-pico/i18n";
import {Pagination}             from "@use-pico/pagination";
import {
    type FilterSchema,
    type OrderBySchema,
    QuerySchema
}                               from "@use-pico/query";
import {type WithSourceQuery}   from "@use-pico/rpc";
import {type PicoSchema}        from "@use-pico/schema";
import {
    Box,
    LinkLockProvider,
    LoadingOverlay,
    ScrollArea,
    Table as CoolTable
}                               from "@use-pico/ui";
import {
    type CSSProperties,
    type FC
}                               from "react";
import {type ITableColumns}     from "../api/ITableColumns";
import {type ITableColumnTuple} from "../api/ITableColumnTuple";
import classes                  from "./Table.module.css";
import {TableBody}              from "./Table/TableBody";
import {TableCountResult}       from "./Table/TableCountResult";
import {TableFoot}              from "./Table/TableFoot";
import {TableHead}              from "./Table/TableHead";
import {TableHeaderControls}    from "./Table/TableHeaderControls";
import {TablePrefix}            from "./Table/TablePrefix";

export namespace Table {
    export interface Props<
        TColumns extends string,
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > extends Partial<Omit<CoolTable.Props, "hidden" | "onClick">>,
        TableHeaderControls.Props<TSchema, TQuerySchema>,
        Omit<TablePrefix.Props<TSchema, TQuerySchema>, "columns" | "items">,
        Omit<TableHead.Props<TSchema, TQuerySchema>, "columns" | "withRowAction" | "disableActions" | "items">,
        Omit<TableBody.Props<TSchema, TQuerySchema>, "columns" | "WithRow" | "withTableAction" | "disableActions">,
        Omit<TableFoot.Props<TSchema, TQuerySchema>, "columns" | "withTableAction" | "withRowAction" | "disableActions" | "items">,
        TableCountResult.Props<TSchema, TQuerySchema> {
        withTranslation?: IWithTranslation;
        /**
         * Define table columns; they will be rendered by default in the specified order
         */
        columns: ITableColumns<TColumns, TSchema, TQuerySchema>;
        /**
         * You can override some columns if you need to
         */
        overrideColumns?: Partial<ITableColumns<TColumns, TSchema, TQuerySchema>>;
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
        withSourceQuery: WithSourceQuery<TSchema, TQuerySchema>;

        WithRow?: FC<TableBody.RowProps<TSchema>>;
        WithPostfix?: TableHeaderControls.Props<TSchema, TQuerySchema>["Postfix"];

        disableActions?: boolean;

        pagination?: {
            hideOnSingle?: boolean;
            /**
             * Where to put pagination, defaults to ["bottom","top"]
             */
            position?: ("top" | "bottom")[];

            props?: Omit<Pagination.Props, "withSourceQuery">;
        };

        withLinkLock?: boolean;
        refresh?: number;
        minWidth?: CSSProperties["minWidth"];
    }

    export type Classes = typeof classes;
}

export const Table = <
    TColumns extends string,
    TSchema extends PicoSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withTranslation,
        columns,
        overrideColumns,
        scrollWidth,
        hidden,
        order,
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
        minWidth = "auto",
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
    const $columns: ITableColumnTuple<TSchema, TQuerySchema>[] = $order.filter(column => !hidden?.includes(column)).map(column => [
        column,
        overrideColumns?.[column] || columns[column],
    ]);

    const result = withSourceQuery.useQuery({
        refetchInterval: refresh,
    });

    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <LinkLockProvider
            isLock={withLinkLock}
        >
            <TableHeaderControls
                withSourceQuery={withSourceQuery}
                Filter={Filter}
                Postfix={WithPostfix}
            />
            {$pagination?.position?.includes("top") && <>
                <Pagination
                    withSourceQuery={withSourceQuery}
                    refresh={refresh}
                    {...$pagination?.props}
                />
            </>}
            <ScrollArea
                w={"100%"}
            >
                <Box w={scrollWidth || undefined}>
                    <LoadingOverlay
                        visible={result.isFetching || result.isLoading}
                        transitionProps={{
                            duration: 500,
                        }}
                        overlayProps={{
                            blur: 2,
                        }}
                    />
                    <>
                        <TablePrefix
                            WithPrefix={WithPrefix}
                            items={result.data}
                            columns={$columns}
                        />
                        <CoolTable.ScrollContainer
                            minWidth={minWidth}
                        >
                            <CoolTable
                                striped
                                highlightOnHover
                                withTableBorder
                                withRowBorders
                                withColumnBorders
                                className={classes.table}
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
                        </CoolTable.ScrollContainer>
                    </>
                </Box>
            </ScrollArea>
            <TableCountResult
                withSourceQuery={withSourceQuery}
                Empty={Empty}
            />
            {$pagination?.position?.includes("bottom") && <>
                <Pagination
                    withSourceQuery={withSourceQuery}
                    refresh={refresh}
                    {...$pagination?.props}
                />
            </>}
        </LinkLockProvider>
    </WithTranslationProvider>;
};
