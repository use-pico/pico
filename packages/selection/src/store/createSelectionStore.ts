import {type WithIdentitySchema}   from "@pico/query";
import {createStore}               from "@pico/store";
import {type ISelectionStore}      from "../api/ISelectionStore";
import {type ISelectionStoreProps} from "../api/ISelectionStoreProps";

export namespace createSelectionStore {
    export interface Props {
        name: string;
    }
}
export type createSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = typeof createSelectionStore<TItem>;

export const createSelectionStore = <
    TItem extends WithIdentitySchema.Type,
>(
    {
        name,
    }: createSelectionStore.Props
): ISelectionStore<TItem> => {
    return createStore<ISelectionStoreProps<TItem>>({
        state: () => (set, get) => ({
            item:      undefined,
            selection: undefined,
            clear() {
                set({
                    item:      undefined,
                    selection: undefined
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
                    throw new Error(`Selection [${name}] has no selected item.`);
                }
                return item;
            },
        }),
        name,
    });
};
