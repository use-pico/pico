import {useContext$} from "@use-pico/hook";
import {useStore}    from "zustand";
import {type IStore} from "../api/IStore";

export function useStore$<
    TStore extends IStore<any>,
    TValue,
>(
    store: IStore.Store<TStore> | undefined,
    selector: (state: TStore["props"] & TStore["values"]) => TValue,
): TValue | null;

export function useStore$<
    TStore extends IStore<any>,
>(
    store: IStore.Store<TStore> | undefined,
): (TStore["props"] & TStore["values"]) | null;

export function useStore$<
    TStore extends IStore<any>,
>(
    store: IStore.Store<TStore> | undefined,
    selector?: <TValue>(state: TStore["props"] & TStore["values"]) => TValue,
) {
    if (!store) {
        return null;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const $store = useContext$(store.Context);
    if ($store) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return selector ? useStore($store, selector) : useStore($store);
    }
    return null;
}
