import {type WithIdentitySchema} from "@pico/query";
import {type IStoreProps}        from "@pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type ISelectionStoreProps<
    TItem extends WithIdentitySchema.Type,
> = IStoreProps<
    {
        item?: TItem;
        selection?: TItem;
        required(): TItem;
    } & IBaseSelection<TItem>
>;
