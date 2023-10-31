"use client";

import {Pack}        from "@use-pico/utils";
import {
    type PropsWithChildren,
    useEffect,
    useMemo
}                    from "react";
import {type IStore} from "../api/IStore";

export namespace StoreProvider {
    export type Props<
        TStore extends IStore<any>,
    > = PropsWithChildren<{
        store: IStore.Store<TStore>;
        values: TStore["values"];
    }>;
}

export const StoreProvider = <
    TStore extends IStore<any>,
>(
    {
        store: {
                   Context,
                   store
               },
        values,
        children,
    }: StoreProvider.Props<TStore>
) => {
    const memo = useMemo(() => store(values), []);
    useEffect(() => {
        values && memo.setState(values);
    }, [Pack.pack(values)]);
    return <Context.Provider value={memo}>
        {children}
    </Context.Provider>;
};
