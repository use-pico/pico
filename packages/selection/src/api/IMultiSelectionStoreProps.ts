import {type WithIdentitySchema} from "@pico/query";
import {type IStoreProps}        from "@pico/store";
import {type IBaseSelection}     from "./IBaseSelection";

export type IMultiSelectionStoreProps<
    TItem extends WithIdentitySchema.Type,
> = IStoreProps<
    {
        items: Map<string, TItem>;
        selection: Map<string, TItem>;
        deselect(item: TItem): void;
        toggle(item: TItem): void;
        isSelection(): boolean;
    } & IBaseSelection<TItem>
>;
