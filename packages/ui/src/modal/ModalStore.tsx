"use client";

import {
    createStore,
    type IStoreProps
} from "@pico/store";

export type IModalStoreProps = IStoreProps<{
    state: Map<string, boolean>;
    open(id: string): void;
    close(id: string): void;
    setOpen(id: string, isOpened: boolean): void;
    isOpen(id: string): boolean;
}>;

export const ModalStore = createStore<IModalStoreProps>({
    state: () => (set, get) => ({
        state:   new Map(),
        open:    id => {
            set({
                state: get().state.set(id, true),
            });
        },
        close:   id => {
            set({
                state: get().state.set(id, false),
            });
        },
        setOpen: (id, isOpened) => {
            set({
                state: get().state.set(id, isOpened),
            });
        },
        isOpen:  id => get().state.get(id) || false,
    }),
    name:  "ModalStore",
    hint:  "Add ModalStoreProvider",
});
