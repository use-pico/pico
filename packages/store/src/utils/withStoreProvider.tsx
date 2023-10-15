"use client";

import {Pack}              from "@pico/utils";
import {
    useEffect,
    useMemo
}                          from "react";
import {type IStoreSchema} from "../api/IStoreSchema";

export interface IWithStoreProviderProps<TStoreSchema extends IStoreSchema<any>> {
    name: string;
    createStore: TStoreSchema["Create"];
    Context: TStoreSchema["Context"];
}

export const withStoreProvider = <TStoreSchema extends IStoreSchema<any>>(
    {
        name,
        createStore,
        Context,
    }: IWithStoreProviderProps<TStoreSchema>): TStoreSchema["Provider"] => {
    return function StoreProvider(
        {
            children,
            defaults,
            state,
        }) {
        const memo = useMemo(() => {
            const store = createStore({
                defaults,
                state
            });
            return {
                name,
                state: store.getState(),
                store
            };
        }, []);
        useEffect(() => {
            defaults && memo.store.setState(defaults);
        }, [Pack.pack(defaults)]);
        return <Context.Provider value={memo}>
            {children}
        </Context.Provider>;
    };
};
