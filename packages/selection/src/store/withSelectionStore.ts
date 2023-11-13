import {type WithIdentitySchema}   from "@use-pico/schema";
import {type IMultiSelectionStore} from "../api/IMultiSelectionStore";
import {type ISelectionStore}      from "../api/ISelectionStore";
import {createMultiSelectionStore} from "./createMultiSelectionStore";
import {createSelectionStore}      from "./createSelectionStore";

export namespace withSelectionStore {
    export interface Store<
        TItem extends WithIdentitySchema.Type,
    > {
        single: ISelectionStore<TItem>;
        multi: IMultiSelectionStore<TItem>;
    }
}

/**
 * This is a helper to create both single and multi selection store.
 */
export const withSelectionStore = <
    TItem extends WithIdentitySchema.Type,
>(): withSelectionStore.Store<
    TItem
> => {
    return {
        /**
         * Single selection store.
         */
        single: createSelectionStore<TItem>(),
        /**
         * Multi selection store.
         */
        multi: createMultiSelectionStore<TItem>(),
    };
};
