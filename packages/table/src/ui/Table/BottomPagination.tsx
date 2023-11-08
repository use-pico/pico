import {Pagination}       from "@use-pico/pagination";
import {type IQueryStore} from "@use-pico/query";
import {
    type IWithSourceQuery,
    useCount
}                         from "@use-pico/source";
import {useStore}         from "@use-pico/store";
import {type FC}          from "react";

export namespace BottomPagination {
    export interface Props {
        text: Pagination.Props<any>["text"];
        withQueryStore: IQueryStore.Store<any>;
        withSourceQuery: IWithSourceQuery<any, any>;
        refresh?: number;
        props?: Omit<Pagination.Props<any>, "withSourceQuery" | "withQueryStore" | "text">;
    }
}

export const BottomPagination: FC<BottomPagination.Props> = (
    {
        text,
        withQueryStore,
        withSourceQuery,
        refresh,
        props,
    }
) => {
    const result = useCount({
        store: withQueryStore,
        withSourceQuery,
    });
    const {
        cursor,
    } = useStore(withQueryStore, (
        {
            cursor,
        }) => ({
        cursor,
    }));
    const pages = Math.ceil((result.data?.count || 0) / (cursor?.size || 30));

    return result.isSuccess && pages > 1 && <Pagination
        withQueryStore={withQueryStore}
        withSourceQuery={withSourceQuery}
        refresh={refresh}
        text={text}
        {...props}
    />;
};
