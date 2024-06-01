import {proxyOf}       from "@use-pico/common";
import {
    createStore as coolCreateStore,
    type StateCreator,
    type StoreApi
}                      from "zustand";
import {createContext} from "../context/createContext";
import type {IStore}   from "./IStore";
import {StoreProvider} from "./StoreProvider";
import {useStore}      from "./useStore";
import {useStore$}     from "./useStore$";

/**
 * This is a helper to create typed (Zustand) store.
 *
 * @group store
 */
export namespace createStore {
    /**
     * Props for `createStore`.
     */
    export interface Props<
        TStore extends IStore<any>
    > {
        /**
         * Store name.
         */
        name?: string;
        /**
         * Store factory.
         */
        factory: Factory<TStore>;
    }

    export type Factory<
        TStore extends IStore<any>
    > = (values: TStore["values"]) => StateCreator<TStore["props"] & TStore["values"]>;
}

export const createStore = <
    TStore extends IStore<any>
>(
    {
        name,
        factory,
    }: createStore.Props<TStore>
): IStore.Store<TStore> => {
    const Context: IStore.Store<TStore>["Context"] = createContext<StoreApi<TStore["props"] & TStore["values"]>>();
    const store: IStore.Store<TStore>["store"] = values => coolCreateStore<TStore["props"] & TStore["values"]>(
        ($set, $get, $store) => factory(values)($set, $get, $store)
    );

    return {
        /**
         * Utility property, just to provide a store type.
         */
        Type: proxyOf(),
        /**
         * Store name.
         */
        name,
        /**
         * Store context.
         */
        Context,
        /**
         * Store factory.
         */
        store(values) {
            return coolCreateStore<TStore["props"] & TStore["values"]>(
                ($set, $get, $store) => factory(values)($set, $get, $store)
            );
        },
        useStore:     () => useStore({Context}),
        useStore$:    () => useStore$({Context}),
        useSelector:  selector => useStore({Context}, selector),
        useSelector$: selector => useStore$({Context}, selector),
        Provider:     props => <StoreProvider
            store={{
                Context,
                store
            }}
            {...props}
        />,
    };
};
