import {
    type FilterSchema,
    type OrderBySchema
}                               from "@use-pico/query";
import {type WithSourceQuery}   from "@use-pico/rpc";
import {type PicoSchema}        from "@use-pico/schema";
import {
    type IMultiSelectionStore,
    type ISelectionStore
}                               from "@use-pico/selection";
import {FilterAction}           from "@use-pico/source";
import {Table}                  from "@use-pico/ui";
import {
    classNames,
    generateId,
    isString
}                               from "@use-pico/utils";
import {
    type FC,
    type PropsWithChildren
}                               from "react";
import {type ITableColumnTuple} from "../../api/ITableColumnTuple";
import classes                  from "../Table.module.css";

export namespace TableBody {
    export interface Props<
        TSchema extends PicoSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
        SelectionStore?: ISelectionStore<PicoSchema.Output<TSchema>>;
        MultiSelectionStore?: IMultiSelectionStore<PicoSchema.Output<TSchema>>;
        WithRow: FC<RowProps<TSchema>>;
        /**
         * Per-row component action handler
         */
        WithRowAction?: FC<WithRowActionProps<TSchema>>;
        withTableAction: boolean;
        columns: ITableColumnTuple<TSchema, TFilterSchema>[];
        disableActions: boolean;
        highlight?: string[];

        onClick?(item: PicoSchema.Output<TSchema>): void;
    }

    export interface WithRowActionProps<TSchema extends PicoSchema> {
        item: PicoSchema.Output<TSchema>;
    }

    export type RowProps<TSchema extends PicoSchema> = PropsWithChildren<{
        className: string;
        entity: PicoSchema.Output<TSchema>;
    }>;
}

export const TableBody = <
    TSchema extends PicoSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        SelectionStore,
        MultiSelectionStore,
        WithRow,
        WithRowAction,
        withTableAction,
        disableActions,
        columns,
        onClick,
        highlight,
    }: TableBody.Props<TSchema, TFilterSchema, TOrderBySchema>
) => {
    const selection = SelectionStore?.use$((
        {
            isSelected,
            isCurrent,
            select,
        }) => ({
        isSelected,
        isCurrent,
        select,
    }));
    const multiSelection = MultiSelectionStore?.use$((
        {
            isSelected,
            isCurrent,
            toggle,
            select,
        }) => ({
        isSelected,
        isCurrent,
        toggle,
        select,
    }));
    const result = withSourceQuery.useQuery();

    return <Table.Tbody>
        {(result.data || [])
            .map(item => <WithRow
                entity={item}
                key={generateId()}
                className={classNames(
                    (selection?.isSelected(item) || multiSelection?.isSelected(item)) ? classes.selection : (selection?.isCurrent(item) || multiSelection?.isCurrent(item) ? classes.active : undefined),
                )}
            >
                {!disableActions && withTableAction && !WithRowAction && <Table.Td/>}
                {!disableActions && WithRowAction && <Table.Td>
                    {WithRowAction && <WithRowAction item={item}/>}
                </Table.Td>}
                {columns.map(([name, {
                    render,
                    withFilter
                }]) => {
                    const Render = render;
                    const children = <Render item={item} highlight={isString(highlight) ? [highlight] : highlight}/>;
                    return <Table.Td
                        key={name}
                        style={(selection || multiSelection || onClick) ? {cursor: "pointer"} : undefined}
                        onClick={() => {
                            selection?.select(item);
                            multiSelection?.toggle(item);
                            onClick?.(item);
                        }}
                    >
                        {withFilter ? <withSourceQuery.WithFilter
                            Filter={({
                                         setFilter,
                                         shallowFilter,
                                         filter,
                                         clearFilter,
                                     }) => <FilterAction
                                isFilter={() => withFilter?.isFilter(filter)}
                                onFilter={() => withFilter?.onFilter({
                                    setFilter,
                                    shallowFilter,
                                    filter,
                                    item,
                                    clearFilter,
                                })}
                                onClear={() => withFilter?.onClear({
                                    setFilter,
                                    shallowFilter,
                                    filter,
                                    item,
                                    clearFilter,
                                })}
                            >
                                <div>
                                    {children}
                                </div>
                            </FilterAction>}
                        /> : children}
                    </Table.Td>;
                })}
            </WithRow>)}
    </Table.Tbody>;
};
