import {type WithIdentitySchema}       from "@pico/query";
import {type IStoreSchema}             from "@pico/store";
import {type IBaseSelectionStoreProps} from "./IBaseSelectionStoreProps";

export type IBaseSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<IBaseSelectionStoreProps<TItem>>["Store"];
