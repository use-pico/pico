import {type WithIdentitySchema} from "@pico/schema";
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
