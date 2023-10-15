"use client";

import {
    createStore,
    type IStoreProps
} from "@pico/store";

export type ILoopsStoreProps = IStoreProps<{
    current: number;

    isRunning(): boolean;

    inc(): void;

    dec(): void;
}>

export const LoopsStore = createStore<ILoopsStoreProps>({
    state: () => (set, get) => ({
        current: 0,
        isRunning() {
            return get().current > 0;
        },
        inc: () => set(({current}) => ({current: current + 1})),
        dec: () => set(({current}) => ({current: current - 1})),
    }),
    name:  "LoopsStore",
    hint:  "Add LoopsProvider."
});
