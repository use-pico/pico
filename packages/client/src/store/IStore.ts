import {
    type Context,
    FC
}                                        from "react";
import {type StoreApi}                   from "zustand";
import {type StoreProvider}              from "./StoreProvider";
import {type useStore as useCoolStore}   from "./useStore";
import {type useStore$ as useCoolStore$} from "./useStore$";

export interface IStore<
    TProps extends IStore.Type,
    TValues extends IStore.Type = IStore.Type,
> {
    props: TProps;
    values: TValues;
}

export namespace IStore {
    export type Type = Record<string, any>;

    export type Props<TStore extends IStore<any, any>> =
        TStore["props"]
        & TStore["values"];

    export type Api<
        TStore extends IStore<any>
    > = StoreApi<Props<TStore>>;

    export interface Store<
        TStore extends IStore<any>
    > {
        /**
         * Proxy property, only used to provide a store type.
         */
        Type: TStore;
        name?: string;
        Context: Context<Api<TStore> | null>;
        Provider: FC<Omit<StoreProvider.Props<TStore>, "store">>;

        store(values: TStore["values"]): Api<TStore>;

        /**
         * Use whole store
         */
        useStore(): ReturnType<typeof useCoolStore<TStore>>;

        /**
         * Use whole optional store
         */
        useStore$(): ReturnType<typeof useCoolStore$<TStore>>;

        /**
         * Use the store with a selector
         */
        useSelector<TValue>(selector: (state: TStore["props"] & TStore["values"]) => TValue): ReturnType<typeof useCoolStore<TStore, TValue>>;

        /**
         * Use optional store with a selector
         */
        useSelector$<TValue>(selector: (state: TStore["props"] & TStore["values"]) => TValue): ReturnType<typeof useCoolStore$<TStore, TValue>>;
    }
}
