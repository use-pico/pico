import {type WithIdentitySchema}        from "@pico/schema";
import {createStore}                    from "@pico/store";
import {type IMultiSelectionStore}      from "../api/IMultiSelectionStore";
import {type IMultiSelectionStoreProps} from "../api/IMultiSelectionStoreProps";

export namespace createMultiSelectionStore {
    export interface Props {
        name: string;
    }
}
export type createMultiSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = typeof createMultiSelectionStore<TItem>;

export const createMultiSelectionStore = <
    TItem extends WithIdentitySchema.Type,
>(
    {
        name,
    }: createMultiSelectionStore.Props
): IMultiSelectionStore<TItem> => {
    return createStore<IMultiSelectionStoreProps<TItem>>({
        state: () => (set, get) => ({
            items:       new Map(),
            selection:   new Map(),
            select:      item => {
                set(state => ({
                    selection: state.selection.set(item.id, item),
                }));
            },
            deselect:    item => {
                set(state => {
                    state.selection.delete(item.id);
                    return ({
                        selection: state.selection,
                    });
                });
            },
            isSelected:  item => {
                return get().selection.has(item.id);
            },
            isCurrent:   item => {
                return get().items.has(item.id);
            },
            isActive:    item => {
                return get().items.has(item.id) || get().selection.has(item.id);
            },
            toggle:      item => {
                set(state => {
                    const toggle = state.selection.has(item.id);
                    state.selection.delete(item.id);
                    !toggle && state.selection.set(item.id, item);
                    return {
                        selection: state.selection,
                    };
                });
            },
            clear:       () => {
                set({
                    items:     new Map(),
                    selection: new Map(),
                });
            },
            commit:      () => {
                set(state => ({
                    items: new Map(state.selection),
                }));
            },
            cancel:      () => {
                set({selection: new Map()});
            },
            isSelection: () => get().selection.size > 0,
        }),
        name,
    });
};
