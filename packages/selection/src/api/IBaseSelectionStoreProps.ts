import {type WithIdentitySchema} from "@use-pico/schema";
import {type IStoreProps}        from "@use-pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type IBaseSelectionStoreProps<
    TItem extends WithIdentitySchema.Type,
> = IStoreProps<IBaseSelection<TItem>>;
