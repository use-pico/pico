"use client";

import {useStore} from "zustand";
import {useContext$} from "../context/useContext$";
import type {IStore} from "./IStore";

export function useStore$<
    TStore extends IStore<any>,
    TValue,
>(
    {Context}: Pick<IStore.Store<TStore>, "Context">,
    selector: (state: TStore["props"] & TStore["values"]) => TValue,
): TValue | null;

export function useStore$<
    TStore extends IStore<any>,
>(
    {Context}: Pick<IStore.Store<TStore>, "Context">,
): (TStore["props"] & TStore["values"]) | null;

export function useStore$<
    TStore extends IStore<any>,
>(
    {Context}: Pick<IStore.Store<TStore>, "Context">,
    selector?: <TValue>(state: TStore["props"] & TStore["values"]) => TValue,
) {
    const $store = useContext$(Context);
    if ($store) {
        return selector ? useStore($store, selector) : useStore($store);
    }
    return null;
}
