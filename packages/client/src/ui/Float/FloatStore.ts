"use client";

import {createStore} from "../../store/createStore";
import type {IStore} from "../../store/IStore";

export namespace FloatStore {
    export type StoreProps = IStore<IStore.Type, {
        close(): void
    }>;
}

export const FloatStore = createStore<FloatStore.StoreProps>({
    name:    "FloatStore",
    factory: values => () => values,
});
