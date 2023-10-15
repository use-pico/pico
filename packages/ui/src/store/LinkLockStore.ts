"use client";

import {
    createStore,
    type IStoreProps
} from "@use-pico/store";

export namespace LinkLockStore {
    export type Props = IStoreProps<{
        isLock: boolean;
        lock(lock?: boolean): void;
        unlock(): void;
    }>;
}

export const LinkLockStore = createStore<LinkLockStore.Props>({
    name:  "LinkLockStore",
    state: () => (set) => ({
        isLock: false,
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
    }),
});
