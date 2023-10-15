"use client";

import {
    createStore,
    type IStoreProps
} from "@pico/store";

export type IBlockStoreProps = IStoreProps<{
    isBlock: boolean;
    block(block?: boolean): void;
    unblock(): void;
}>

export const BlockStore = createStore<IBlockStoreProps>({
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
