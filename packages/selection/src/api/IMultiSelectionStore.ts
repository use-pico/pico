import {type WithIdentitySchema}        from "@use-pico/schema";
import {type IStoreSchema}              from "@use-pico/store";
import {type IMultiSelectionStoreProps} from "./IMultiSelectionStoreProps";

export type IMultiSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<IMultiSelectionStoreProps<TItem>>["Store"];
