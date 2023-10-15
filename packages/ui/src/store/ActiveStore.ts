"use client";

import {
    createStore,
    type IStoreProps
} from "@pico/store";

export namespace ActiveStore {
    export type StoreProps = IStoreProps<{
        active: string[];
        setActive(active: string[]): void;
    }>;
}

export const ActiveStore = createStore<ActiveStore.StoreProps>({
    name:  "ActiveStore",
    state: ({defaults}) => set => ({
        active: [],
        setActive(active: string[]) {
            set({
                active,
            });
        },
        ...defaults,
    }),
});
