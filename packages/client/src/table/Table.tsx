import {FloatingDelayGroup}    from "@floating-ui/react";
import {
    cn,
    type FilterSchema,
    type OrderByOf,
    type OrderBySchema,
    type QuerySchema,
    type WithIdentitySchema
}                              from "@use-pico2/common";
import type {
    FC,
    ReactNode
}                              from "react";
import {type z}                from "zod";
import {Fulltext}              from "../query/Fulltext";
import {type IQueryStore}      from "../query/IQueryStore";
import type {IWithSourceQuery} from "../query/IWithSourceQuery";
import {Pagination}            from "../query/Pagination";
import {Body}                  from "./Body";
import {Header}                from "./Header";
import {Loader}                from "./Loader";
import {Progress}              from "./Progress";
import {Refresh}               from "./Refresh";
import {RemoveFilter}          from "./RemoveFilter";

export namespace Table {
    export interface Render<
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > extends cn.WithClass {
        /**
         * Column title.
         */
        title?: ReactNode;
        /**
         * Render column contents; function is component, thus hooks and everything else can be used.
         */
        render: FC<Render.RenderProps<TSchema>>;
        /**
         * Enable sorting: all columns are sorted by same rules: ascending, descending, none.
         */
        sort?: OrderByOf<TQuerySchema>;
        /**
         * Setup a dynamic filters for a column.
         */
        filters?: Filters<TSchema, TQuerySchema>;
    }

    export namespace Render {
        export interface RenderProps<
            TSchema extends WithIdentitySchema,
        > {
            /**
             * Item from collection to render.
             */
            item: z.infer<TSchema>;
        }
    }

    /**
     * Special filters are separated to display the correct UI for filtered items.
     */
    export interface Filters<
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        /**
         * Common equal filter.
         */
        equal?: Filter<TSchema, TQuerySchema>;
        /**
         * Comparison filters (greater than, less than).
         */
        compare?: {
            /**
             * Greater than.
             */
            gte: Filter<TSchema, TQuerySchema>;
            /**
             * Less than.
             */
            lte: Filter<TSchema, TQuerySchema>;
        };
    }

    export interface Filter<
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        /**
         * Check if a filter is applied to a column.
         */
        isFilter(filter?: z.infer<TQuerySchema["shape"]["filter"]>): boolean;

        /**
         * Apply a filter to a column.
         */
        filter(props: Filter.FilterProps<TSchema, TQuerySchema>): void;

        /**
         * Clear a filter from a column.
         */
        clear(props: Filter.ClearProps<TQuerySchema>): void;
    }

    export namespace Filter {
        export interface FilterProps<
            TSchema extends WithIdentitySchema,
            TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        > {
            item: z.infer<TSchema>;
            shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
        }

        export interface ClearProps<
            TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        > {
            shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
        }
    }

    /**
     * Action component is used to perform an action on the whole table.
     */
    export type Action = FC;
    /**
     * Row component is used to perform an action on a single row.
     */
    export type Row<
        TSchema extends WithIdentitySchema,
    > = FC<{
        entity: z.infer<TSchema>
    }>;

    export interface Props<
        TColumns extends string,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends WithIdentitySchema,
    > extends cn.WithClass {
        /**
         * Query store containing query data for the table.
         */
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        /**
         * Query source to fetch data from.
         */
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
        /**
         * Table action (over the whole table).
         */
        action?: Action;
        /**
         * Table row action (over a single row).
         */
        row?: Row<TSchema>;
        /**
         * How oftern refetch data.
         */
        refresh?: number;

        /**
         * Column renderers.
         */
        render: Partial<Record<TColumns, Render<TSchema, TQuerySchema>>>;
        /**
         * Column order to display; if a column is not present in an order array, it is ommited from rendering.
         */
        columns?: TColumns[];
        /**
         * Columns to hide.
         */
        hidden?: TColumns[];
        style?: {
            wrapper?: cn.ClassNames;
            pagination?: cn.ClassNames;
        };
        /**
         * Where to display pagination.
         */
        pagination?: ("top" | "bottom")[];
        /**
         * All the texts used in the table.
         */
        text?: {
            pagination?: Pagination.Props<TQuerySchema>["text"];
        };
        /**
         * Should fulltext get automatically focus.
         */
        focus?: boolean;
    }

    export type PropsEx<
        TColumns extends string,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends WithIdentitySchema,
    > = Omit<Props<TColumns, TQuerySchema, TSchema>, "withQueryStore" | "withSourceQuery" | "item">;
}

export const Table = <
    TColumns extends string,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends WithIdentitySchema,
>(
    {
        withQueryStore,
        withSourceQuery,
        action,
        row,
        refresh,
        render,
        columns = Object.keys(render) as TColumns[],
        hidden = [],
        style,
        pagination = ["top", "bottom"],
        text,
        focus = false,
        cx,
    }: Table.Props<TColumns, TQuerySchema, TSchema>
) => {
    return <FloatingDelayGroup
        delay={{
            open:  1000,
            close: 200,
        }}
    >
        <div>
            <div
                className={cn(
                    "flex items-center justify-between",
                )}
            >
                <Fulltext
                    withQueryStore={withQueryStore}
                    focus={focus}
                />
                <div
                    className={cn(
                        "flex flex-row items-center justify-center gap-2",
                    )}
                >
                    {pagination?.includes("top") && <Pagination
                        withQueryStore={withQueryStore}
                        withSourceQuery={withSourceQuery}
                        cx={[
                            "mb-1",
                            style?.pagination
                        ]}
                        text={text?.pagination}
                    />}
                    <Refresh
                        withQueryStore={withQueryStore}
                        withSourceQuery={withSourceQuery}
                        refresh={refresh}
                    />
                    <RemoveFilter
                        withQueryStore={withQueryStore}
                        withSourceQuery={withSourceQuery}
                        refresh={refresh}
                    />
                </div>
            </div>
            <Progress
                withQueryStore={withQueryStore}
                withSourceQuery={withSourceQuery}
                refresh={refresh}
            />
            <div
                className={cn(
                    "relative overflow-x-auto",
                )}
            >
                <table
                    className={cn(
                        "text-sm text-left text-slate-500 min-w-full w-max",
                        "table-fixed",
                        cx,
                    )}
                >
                    <Header
                        withQueryStore={withQueryStore}
                        action={action}
                        row={row}
                        render={render}
                        columns={columns}
                        hidden={hidden}
                    />
                    <Body
                        withSourceQuery={withSourceQuery}
                        withQueryStore={withQueryStore}
                        action={action}
                        row={row}
                        refresh={refresh}
                        render={render}
                        columns={columns}
                        hidden={hidden}
                    />
                </table>
            </div>
            <Loader
                withQueryStore={withQueryStore}
                withSourceQuery={withSourceQuery}
            />
            <div
                className={cn(
                    "flex flex-row items-center justify-end gap-2",
                )}
            >
                {pagination?.includes("bottom") && <Pagination
                    withQueryStore={withQueryStore}
                    withSourceQuery={withSourceQuery}
                    cx={[
                        "mt-1",
                        style?.pagination
                    ]}
                    text={text?.pagination}
                />}
                <Refresh
                    withQueryStore={withQueryStore}
                    withSourceQuery={withSourceQuery}
                    refresh={refresh}
                />
                <RemoveFilter
                    withQueryStore={withQueryStore}
                    withSourceQuery={withSourceQuery}
                    refresh={refresh}
                />
            </div>
        </div>
    </FloatingDelayGroup>;
};
