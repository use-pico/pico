import {
    cn,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type WithIdentitySchema
} from "@use-pico/common";
import {FilterRemoveIcon} from "../icon/FilterRemoveIcon";
import {LoaderIcon} from "../icon/LoaderIcon";
import {useSourceQuery} from "../query/useSourceQuery";
import {useStore} from "../store/useStore";
import {Action} from "../ui/Action";
import {Table} from "./Table";

export namespace RemoveFilter {
    export type Props<
        TColumns extends string,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TSchema extends WithIdentitySchema,
    > =
        Pick<
            Table.Props<TColumns, TQuerySchema, TSchema>,
            "withSourceQuery" | "withQueryStore" | "refresh"
        >
        & cn.WithClass;
}

export const RemoveFilter = <
    TColumns extends string,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends WithIdentitySchema,
>(
    {
        withQueryStore,
        withSourceQuery,
        refresh,
    }: RemoveFilter.Props<TColumns, TQuerySchema, TSchema>
) => {
    const result = useSourceQuery({
        store:           withQueryStore,
        withSourceQuery,
        refetchInterval: refresh,
    });
    const queryStore = useStore(withQueryStore, (
        {
            clearFilter,
            isFilter,
        }) => ({
        clearFilter,
        isFilter,
    }));

    return queryStore.isFilter() ? <Action
        icon={{
            enabled:  FilterRemoveIcon,
            disabled: FilterRemoveIcon,
            loading:  LoaderIcon,
        }}
        cx={[
            "text-amber-500",
        ]}
        disabled={result.isFetching}
        onClick={() => queryStore.clearFilter()}
    /> : null;
};
