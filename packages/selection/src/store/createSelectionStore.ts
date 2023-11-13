import {type WithIdentitySchema} from "@use-pico/schema";
import {createStore}             from "@use-pico/store";
import {type ISelectionStore}    from "../api/ISelectionStore";

export type createSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = typeof createSelectionStore<TItem>;

/**
 * This is a helper to create single selection store.
 */
export const createSelectionStore = <
    TItem extends WithIdentitySchema.Type,
>(): ISelectionStore<TItem> => {
    return createStore<ISelectionStore.Store<TItem>>({
        name:    "SelectionStore",
        factory: () => (set, get) => ({
            item:      undefined,
            selection: undefined,
            clear() {
                set({
                    item:      undefined,
                    selection: undefined,
                });
            },
            commit() {
                set(state => ({
                    item: state.selection,
                }));
            },
            cancel() {
                set({selection: undefined});
            },
            select(selection) {
                set({selection});
            },
            isSelected(item) {
                return get().selection?.id === item.id;
            },
            isCurrent(item) {
                return get().item?.id === item.id;
            },
            isActive(item) {
                return get().selection?.id === item.id || get().item?.id === item.id;
            },
            required() {
                const item = get().item;
                if (!item) {
                    throw new Error(`Selection has no selected item.`);
                }
                return item;
            },
        }),
    });
};
