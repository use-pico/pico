"use client";

import {
    createStore,
    type IStore
} from "@use-pico/store";

export namespace ActiveStore {
    export type StoreProps = IStore<{
        setActive(active: string[]): void;
    }, {
        active: string[];
    }>;
}

export const ActiveStore = createStore<ActiveStore.StoreProps>(values => set => ({
    setActive(active: string[]) {
        set({
            active,
        });
    },
    ...values,
}));
