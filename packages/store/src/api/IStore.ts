import {type Context}  from "react";
import {type StoreApi} from "zustand";

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
        name?: string;
        Context: Context<Api<TStore> | null>;

        store(values: TStore["values"]): Api<TStore>;
    }
}
