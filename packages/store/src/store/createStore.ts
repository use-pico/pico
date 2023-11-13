import {createContext} from "@use-pico/hook";
import {
    createStore as coolCreateStore,
    type StateCreator,
    type StoreApi
}                      from "zustand";
import {type IStore}   from "../api/IStore";

export namespace createStore {
    export interface Props<
        TStore extends IStore<any>
    > {
        name?: string;
        factory: Factory<TStore>;
    }

    export type Factory<
        TStore extends IStore<any>
    > = (values: TStore["values"]) => StateCreator<TStore["props"] & TStore["values"]>;
}

/**
 * This is a helper to create (Zustand) store.
 */
export const createStore = <
    TStore extends IStore<any>
>(
    {
        name,
        factory,
    }: createStore.Props<TStore>
): IStore.Store<TStore> => {
    return {
        /**
         * Store name.
         */
        name,
        /**
         * Store context.
         */
        Context: createContext<StoreApi<TStore["props"] & TStore["values"]>>(),
        /**
         * Store factory.
         */
        store(values) {
            return coolCreateStore<TStore["props"] & TStore["values"]>(
                ($set, $get, $store) => factory(values)($set, $get, $store)
            );
        },
    };
};
