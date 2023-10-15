import {useContext}        from "@use-pico/context";
import {useStore}          from "zustand";
import {type IStoreSchema} from "../api/IStoreSchema";

export const withUseState = <TStoreSchema extends IStoreSchema<any>>(
    Context: TStoreSchema["Context"],
    name: string,
    hint?: string
): TStoreSchema["UseState"] => {
    return <T>(selector?: (state: TStoreSchema["Props"]) => T) => {
        const {store} = useContext(Context, name, hint);
        return selector ? useStore(store, selector) : useStore(store);
    };
};
