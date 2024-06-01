"use client";

import type {WithIdentitySchema} from "@use-pico/common";
import {createStore} from "../store/createStore";
import type {IStore} from "../store/IStore";

export namespace createSelectionStore {
    export type Selection =
        | "single"
        | "multi"
        | "none";

    export type StoreProps<TItem extends WithIdentitySchema.Type> = IStore<{
        /**
         * Selected (commited) items.
         */
        items: Map<string, TItem>;
        /**
         * Currently selected items (not commited).
         */
        selection: Map<string, TItem>;

        /**
         * Unselect the given item.
         */
        deselect(item: TItem): void;

        /**
         * Toggle the given item.
         */
        toggle(item: TItem): void;

        /**
         * Is something selected?
         */
        isSelection(): boolean;

        /**
         * Returns currently selected item or throws an error.
         */
        required(): TItem;
        item(): TItem | undefined;

        /**
         * Set currently selected item
         */
        select(item: TItem, selection?: Selection): void;

        /**
         * Checks if the given item is selected (by an ID)
         */
        isSelected(item: TItem): boolean;

        /**
         * Is the given entity a currently selected item.
         */
        isCurrent(item: TItem): boolean;

        /**
         * Checks isSelected || isCurrent.
         */
        isActive(item: TItem): boolean;

        /**
         * Commit the selection.
         */
        commit(): void;

        /**
         * Cancel the selection.
         */
        cancel(): void;

        /**
         * Clear the selection.
         */
        clear(): void;
    }>;
}

export const createSelectionStore = <
    TItem extends WithIdentitySchema.Type,
>() => {
    return createStore<createSelectionStore.StoreProps<TItem>>({
        name: "SelectionStore",
        factory: () => (set, get) => ({
            items: new Map(),
            selection: new Map(),
            select: (item, selection) => {
                set(state => {
                    switch (selection) {
                        case "single": {
                            state.selection.clear();
                            return {
                                selection: state.selection.set(item.id, item),
                            };
                        }
                        case "multi": {
                            return {
                                selection: state.selection.set(item.id, item),
                            };
                        }
                        case "none": {
                            // noop, selection disabled
                        }
                    }
                });
            },
            deselect: item => {
                set(state => {
                    state.selection.delete(item.id);
                    return ({
                        selection: state.selection,
                    });
                });
            },
            isSelected: item => {
                return get().selection.has(item.id);
            },
            isCurrent: item => {
                return get().items.has(item.id);
            },
            isActive: item => {
                return get().items.has(item.id) || get().selection.has(item.id);
            },
            toggle: item => {
                set(state => {
                    const toggle = state.selection.has(item.id);
                    state.selection.delete(item.id);
                    !toggle && state.selection.set(item.id, item);
                    return {
                        selection: state.selection,
                    };
                });
            },
            clear: () => {
                set({
                    items: new Map(),
                    selection: new Map(),
                });
            },
            commit: () => {
                set(state => ({
                    items: new Map(state.selection),
                }));
            },
            cancel: () => {
                set({selection: new Map()});
            },
            isSelection: () => get().selection.size > 0,
            required() {
                const item = get().item();
                if (!item) {
                    throw new Error(`Selection has no selected item.`);
                }
                return item;
            },
            item() {
                return get().selection.values().next().value;
            },
        }),
    });
};
