import {type WithIdentitySchema}        from "@pico/query";
import {type IStoreSchema}              from "@pico/store";
import {type IMultiSelectionStoreProps} from "./IMultiSelectionStoreProps";

export type IMultiSelectionStore<
    TItem extends WithIdentitySchema.Type,
> = IStoreSchema<IMultiSelectionStoreProps<TItem>>["Store"];
