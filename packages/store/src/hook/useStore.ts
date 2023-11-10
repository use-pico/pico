import {useContext}               from "@use-pico/hook";
import {useStore as useCoolStore} from "zustand";
import {type IStore}              from "../api/IStore";

export function useStore<
    TStore extends IStore<any>,
    TValue,
>(
    {Context}: IStore.Store<TStore>,
    selector: (state: TStore["props"] & TStore["values"]) => TValue,
): TValue;

export function useStore<
    TStore extends IStore<any>,
>(
    {Context}: IStore.Store<TStore>,
): TStore["props"] & TStore["values"];

export function useStore<
    TStore extends IStore<any>,
>(
    {
        Context,
        name
    }: IStore.Store<TStore>,
    selector?: <TValue>(state: TStore["props"] & TStore["values"]) => TValue,
) {
    const store = useContext(Context, name ?? "useStore");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return selector ? useCoolStore(store, selector) : useCoolStore(store);
}
