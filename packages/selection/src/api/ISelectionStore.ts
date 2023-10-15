import {type WithIdentitySchema}   from "@pico/schema";
import {type IStoreSchema}         from "@pico/store";
import {type ISelectionStoreProps} from "./ISelectionStoreProps";

export type ISelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<ISelectionStoreProps<TItem>>["Store"];
