import {type WithIdentitySchema}  from "@use-pico2/common";
import type {IStore}              from "../store/IStore";
import type {IBaseSelection}      from "./IBaseSelection";
import type {IBaseSelectionStore} from "./IBaseSelectionStore";

export type IMultiSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IBaseSelectionStore<TItem, IMultiSelectionStore.Props<TItem>>;

export namespace IMultiSelectionStore {
    export interface Props<
        TItem extends WithIdentitySchema.Type,
    > {
        items: Map<string, TItem>;
        selection: Map<string, TItem>;

        deselect(item: TItem): void;

        toggle(item: TItem): void;

        isSelection(): boolean;
    }

    export type Store<
        TItem extends WithIdentitySchema.Type,
    > = IStore<IBaseSelection<TItem> & Props<TItem>>;
}
