import {type WithIdentitySchema}  from "@use-pico/schema";
import {type IStore}              from "@use-pico/store";
import {type IBaseSelection}      from "./IBaseSelection";
import {type IBaseSelectionStore} from "./IBaseSelectionStore";

export type ISelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IBaseSelectionStore<TItem, ISelectionStore.Props<TItem>>;

export namespace ISelectionStore {
    export interface Props<
        TItem extends WithIdentitySchema.Type,
    > {
        item?: TItem;
        selection?: TItem;

        required(): TItem;
    }

    export type Store<
        TItem extends WithIdentitySchema.Type,
    > = IStore<IBaseSelection<TItem> & Props<TItem>>;
}
