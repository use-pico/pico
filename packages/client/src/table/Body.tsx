"use client";

import {
    cn,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type WithIdentitySchema
}                       from "@use-pico2/common";
import {useSourceQuery} from "../query/useSourceQuery";
import {Cell}           from "./Cell";
import {Table}          from "./Table";

export namespace Body {
    export type Props<
        TColumns extends string,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends WithIdentitySchema,
    > =
        Pick<
            Table.Props<TColumns, TQuerySchema, TSchema>,
            "render" | "columns" | "hidden" | "withSourceQuery" | "withQueryStore" | "refresh" | "action" | "row"
        >
        & cn.WithClass;
}

export const Body = <
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
        columns,
        hidden = [],
    }: Body.Props<TColumns, TQuerySchema, TSchema>
) => {
    const Row = row;
    const result = useSourceQuery({
        store:           withQueryStore,
        withSourceQuery: withSourceQuery,
        refetchInterval: refresh,
    });

    return <tbody>
        {result.data?.map((item) => <tr
            key={item.id}
            className={cn(
                "border-b hover:bg-slate-100",
                "odd:bg-white",
                "even:bg-slate-50",
            )}
        >
            {(Row || action) && <td
                className={"w-0"}
            >
                {Row && <Row entity={item}/>}
            </td>}
            {columns?.filter(column => !hidden?.includes(column))?.map(column => <Cell
                key={`table-column-body-${column}-${item.id}`}
                withQueryStore={withQueryStore}
                render={render[column]}
                item={item}
            />)}
        </tr>)}
    </tbody>;
};
