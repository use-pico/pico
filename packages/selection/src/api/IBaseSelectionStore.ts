import {type WithIdentitySchema} from "@use-pico/schema";
import {type IStore}             from "@use-pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type IBaseSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStore.Store<IBaseSelectionStore.Store<TItem>>;

export namespace IBaseSelectionStore {
    export type Store<
        TItem extends WithIdentitySchema.Type,
    > = IStore<IBaseSelection<TItem>>;
}
