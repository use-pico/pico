import {useContext$}       from "@use-pico/context";
import {useStore}          from "zustand";
import {type IStoreSchema} from "../api/IStoreSchema";

export const withUseState$ = <TStoreSchema extends IStoreSchema<any>>(
    Context: TStoreSchema["Context"]
): TStoreSchema["UseState$"] => {
    return <T>(selector?: (state: TStoreSchema["Props"] | null) => T | null) => {
        const {store} = useContext$(Context) || {};
        if (store) {
            return selector ? useStore(store, selector) : useStore(store);
        }
        return null;
    };
};
