import {type WithIdentitySchema} from "@use-pico/schema";
import {type IStore}             from "@use-pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type IMultiSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStore.Store<IMultiSelectionStore.Store<TItem>>;

export namespace IMultiSelectionStore {
    export type Store<
        TItem extends WithIdentitySchema.Type,
    > = IStore<
        {
            items: Map<string, TItem>;
            selection: Map<string, TItem>;
            deselect(item: TItem): void;
            toggle(item: TItem): void;
            isSelection(): boolean;
        } & IBaseSelection<TItem>
    >;
}
