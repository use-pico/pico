import {type WithIdentitySchema} from "@use-pico/schema";
import {type IStoreProps}        from "@use-pico/store";
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
