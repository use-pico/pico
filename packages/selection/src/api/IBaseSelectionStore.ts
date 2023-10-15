import {type WithIdentitySchema}       from "@use-pico/schema";
import {type IStoreSchema}             from "@use-pico/store";
import {type IBaseSelectionStoreProps} from "./IBaseSelectionStoreProps";

export type IBaseSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<IBaseSelectionStoreProps<TItem>>["Store"];
