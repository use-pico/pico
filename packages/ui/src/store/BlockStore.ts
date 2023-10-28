"use client";

import {
    createStore,
    type IStoreProps
} from "@use-pico/store";

export namespace BlockStore {
    export type StoreProps = IStoreProps<{
        isBlock: boolean;
        block(block?: boolean): void;
        unblock(): void;
    }>;
}

export const BlockStore = createStore<BlockStore.StoreProps>({
    state: () => (set) => ({
        isBlock: false,
        block:   (block = true) => {
            set({isBlock: block});
        },
        unblock: () => {
            set({isBlock: false});
        },
    }),
    name:  "BlockStore",
    hint:  "Add BlockProvider."
});
