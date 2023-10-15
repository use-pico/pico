import {type WithIdentitySchema} from "@pico/query";
import {type IStoreProps}        from "@pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type IBaseSelectionStoreProps<
    TItem extends WithIdentitySchema.Type,
> = IStoreProps<IBaseSelection<TItem>>;
