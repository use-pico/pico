"use client";

import {useStore as useCoolStore} from "zustand";
import {useContext}               from "../context/useContext";
import type {IStore}              from "./IStore";

export function useStore<
    TStore extends IStore<any>,
    TValue,
>(
    {Context}: Pick<IStore.Store<TStore>, "Context">,
    selector: (state: TStore["props"] & TStore["values"]) => TValue,
): TValue;

export function useStore<
    TStore extends IStore<any>,
>(
    {Context}: Pick<IStore.Store<TStore>, "Context">,
): TStore["props"] & TStore["values"];

export function useStore<
    TStore extends IStore<any>,
>(
    {
        Context,
        name
    }: Pick<IStore.Store<TStore>, "Context" | "name">,
    selector?: <TValue>(state: TStore["props"] & TStore["values"]) => TValue,
) {
    const store = useContext(Context, name ?? "useStore");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return selector ? useCoolStore(store, selector) : useCoolStore(store);
}
