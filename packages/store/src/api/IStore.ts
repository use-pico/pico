import {type Context}  from "react";
import {type StoreApi} from "zustand";

export interface IStore<
    TProps extends IStore.Props,
    TValues extends IStore.Props = IStore.Props,
> {
    props: TProps;
    values: TValues;
}

export namespace IStore {
    export type Props = Record<string, any>;

    export type Api<
        TStore extends IStore<any>
    > = StoreApi<TStore["props"] & TStore["values"]>;

    export interface Store<
        TStore extends IStore<any>
    > {
        Context: Context<Api<TStore> | null>;

        store(values: TStore["values"]): Api<TStore>;
    }
}
