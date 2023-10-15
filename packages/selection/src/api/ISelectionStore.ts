import {type WithIdentitySchema}   from "@use-pico/schema";
import {type IStoreSchema}         from "@use-pico/store";
import {type ISelectionStoreProps} from "./ISelectionStoreProps";

export type ISelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<ISelectionStoreProps<TItem>>["Store"];
