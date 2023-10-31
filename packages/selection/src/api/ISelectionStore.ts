import {type WithIdentitySchema} from "@use-pico/schema";
import {type IStore}             from "@use-pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type ISelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStore.Store<ISelectionStore.Store<TItem>>;

export namespace ISelectionStore {
    export type Store<
        TItem extends WithIdentitySchema.Type,
    > = IStore<
        {
            item?: TItem;
            selection?: TItem;
            required(): TItem;
        } & IBaseSelection<TItem>
    >;
}
