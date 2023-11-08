import {
    type IQueryStore,
    type QuerySchema
}                               from "@use-pico/query";
import {
    type PicoSchema,
    type WithIdentitySchema
}                               from "@use-pico/schema";
import {
    type IMultiSelectionStore,
    type ISelectionStore
}                               from "@use-pico/selection";
import {
    type IWithSourceQuery,
    useQuery
}                               from "@use-pico/source";
import {
    FilterAction,
    WithFilter
}                               from "@use-pico/source-ui";
import {useStore$}              from "@use-pico/store";
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
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
        SelectionStore?: ISelectionStore<PicoSchema.Output<TSchema>>;
        MultiSelectionStore?: IMultiSelectionStore<PicoSchema.Output<TSchema>>;
        WithRow: FC<RowProps<TSchema>>;
        /**
         * Per-row component action handler
         */
        WithRowAction?: FC<WithRowActionProps<TSchema>>;
        withTableAction: boolean;
        columns: ITableColumnTuple<TQuerySchema, TSchema>[];
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
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    {
        withQueryStore,
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
    }: TableBody.Props<TQuerySchema, TSchema>
) => {
    const selection = useStore$(SelectionStore, (
        {
            isSelected,
            isCurrent,
            select,
        }) => ({
        isSelected,
        isCurrent,
        select,
    }));
    const multiSelection = useStore$(MultiSelectionStore, (
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
    const result = useQuery({
        store: withQueryStore,
        withSourceQuery: withSourceQuery,
    });

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
                        {withFilter ? <WithFilter
                            withQueryStore={withQueryStore}
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
