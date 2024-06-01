"use client";

import {
    cn,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type WithIdentitySchema
}                         from "@use-pico/common";
import {useTransition}    from "react";
import {FilterRemoveIcon} from "../icon/FilterRemoveIcon";
import {GteIcon}          from "../icon/GteIcon";
import {LteIcon}          from "../icon/LteIcon";
import type {IQueryStore} from "../query/IQueryStore";
import {useStore}         from "../store/useStore";
import {Icon}             from "../ui/Icon";
import {Table}            from "./Table";

export namespace Sort {
    export interface Props<
        TSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > extends Table.Render<TSchema, TQuerySchema> {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
    }
}

export const Sort = <
    TSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withQueryStore,
        sort,
        title,
        filters,
        cx,
    }: Sort.Props<TSchema, TQuerySchema>
) => {
    const queryStore = useStore(withQueryStore, (
        {
            orderBy,
            setOrderBy,
            filter,
            shallowFilter,
            setCursor,
        }) => ({
        orderBy,
        setOrderBy,
        filter,
        shallowFilter,
        setCursor,
    }));
    const $sort = queryStore.orderBy?.[sort as string];
    const [, startTransition] = useTransition();

    return <th
        scope={"col"}
        className={cn(
            "px-4 py-2",
            cx,
        )}
    >
        <div
            className={cn(
                "flex flex-row items-center justify-between",
            )}
        >
            <div>{title}</div>
            <div
                className={cn(
                    "flex flex-row items-center gap-2",
                )}
            >
                {filters?.equal?.isFilter(queryStore.filter) && <Icon
                    icon={FilterRemoveIcon}
                    size={"md"}
                    cx={[
                        "opacity-50 hover:opacity-100",
                        "cursor-pointer",
                    ]}
                    onClick={() => {
                        startTransition(() => {
                            filters?.equal?.clear({
                                shallowFilter: queryStore.shallowFilter,
                            });
                            queryStore.setCursor(0);
                        });
                    }}
                />}
                {filters?.compare?.lte.isFilter(queryStore.filter) && <Icon
                    icon={LteIcon}
                    size={"md"}
                    cx={[
                        "opacity-50 hover:opacity-100",
                        "cursor-pointer",
                    ]}
                    onClick={() => {
                        startTransition(() => {
                            filters?.compare?.lte.clear({
                                shallowFilter: queryStore.shallowFilter,
                            });
                            queryStore.setCursor(0);
                        });
                    }}
                />}
                {filters?.compare?.gte.isFilter(queryStore.filter) && <Icon
                    icon={GteIcon}
                    size={"md"}
                    cx={[
                        "opacity-50 hover:opacity-100",
                        "cursor-pointer",
                    ]}
                    onClick={() => {
                        startTransition(() => {
                            filters?.compare?.gte.clear({
                                shallowFilter: queryStore.shallowFilter,
                            });
                            queryStore.setCursor(0);
                        });
                    }}
                />}
                {sort && <Icon
                    icon={$sort === "asc" ? "icon-[bi--sort-down]" : ($sort === "desc" ? "icon-[bi--sort-up]" : "icon-[system-uicons--sort]")}
                    size={"lg"}
                    cx={[
                        "opacity-50 hover:opacity-100",
                        "cursor-pointer",
                    ]}
                    onClick={() => queryStore.setOrderBy({
                        [sort]: $sort === "asc" ? "desc" : ($sort === "desc" ? undefined : "asc")
                    })}
                />}
            </div>
        </div>
    </th>;
};
