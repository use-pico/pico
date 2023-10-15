import {
    createContext,
    useContext,
    useContext$
}                                       from "@use-pico/context";
import {createStore as coolCreateStore} from "zustand";
import {type IStoreProps}               from "../api/IStoreProps";
import {type IStoreSchema}              from "../api/IStoreSchema";
import {withStoreProvider}              from "./withStoreProvider";
import {withUseState}                   from "./withUseState";
import {withUseState$}                  from "./withUseState$";

/**
 * Creates store hook and provider of Zustand.
 */
export const createStore = <
    TStoreProps extends IStoreProps,
    TStoreSchema extends IStoreSchema<any> = IStoreSchema.Of<TStoreProps>,
>(
    {
        state,
        name,
        hint,
    }: TStoreSchema["FactoryProps"]
): TStoreSchema["Store"] => {
    const Context = createContext<TStoreSchema["StoreContext"]>();
    return {
        name,
        Provider:  withStoreProvider<TStoreSchema>({
            name,
            Context,
            createStore: ({
                              defaults: $defaults,
                              state:    $state
                          }) => coolCreateStore<TStoreProps["StoreProps"]>(($set, $get, $store) => ({
                ...state({
                    defaults: $defaults,
                    state:    $state
                })($set, $get, $store),
                ...$defaults,
            })),
        }),
        Consumer:  Context.Consumer,
        use:       withUseState(Context, name, hint),
        use$:      withUseState$(Context),
        useStore:  () => useContext(Context, name, hint).store,
        useStore$: () => useContext$(Context)?.store || null,
    };
};
