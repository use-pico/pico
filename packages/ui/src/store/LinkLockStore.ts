"use client";

import {
    createStore,
    type IStore
} from "@use-pico/store";

export namespace LinkLockStore {
    export type Props = IStore<{
        lock(lock?: boolean): void;
        unlock(): void;
    }, {
        isLock: boolean;
    }>;
}

export const LinkLockStore = createStore<LinkLockStore.Props>({
    name:    "LinkLockStore",
    factory: values => (set) => ({
        lock:   (lock = true) => {
            set({
                isLock: lock,
            });
        },
        unlock: () => {
            set({
                isLock: false,
            });
        },
        ...values,
    }),
});
