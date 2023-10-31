"use client";

import {
    createStore,
    type IStore
} from "@use-pico/store";

export namespace BlockStore {
    export type StoreProps = IStore<{
        block(block?: boolean): void;
        unblock(): void;
    }, {
        isBlock: boolean;
    }>;
}

export const BlockStore = createStore<BlockStore.StoreProps>(values => (set) => ({
    block:   (block = true) => {
        set({isBlock: block});
    },
    unblock: () => {
        set({isBlock: false});
    },
    ...values,
}));
