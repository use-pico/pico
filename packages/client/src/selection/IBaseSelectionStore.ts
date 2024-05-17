import {type WithIdentitySchema} from "@use-pico2/common";
import {type IStore}             from "../store/IStore";
import type {IBaseSelection}     from "./IBaseSelection";

export type IBaseSelectionStore<
    TItem extends WithIdentitySchema.Type,
    TProps extends IStore.Type,
> = IStore.Store<IBaseSelectionStore.Store<TItem, TProps>>;

export namespace IBaseSelectionStore {
    export type Store<
        TItem extends WithIdentitySchema.Type,
        TProps extends IStore.Type,
    > = IStore<IBaseSelection<TItem> & TProps>;
}
