import {type WithIdentitySchema} from "@pico/query";

export interface IBaseSelection<TItem extends WithIdentitySchema.Type> {
    /**
     * Set currently selected item
     */
    select(item: TItem): void;

    /**
     * Checks if the given item is selected (by an ID)
     */
    isSelected(item: TItem): boolean;

    /**
     * Is the given entity a currently selected item.
     */
    isCurrent(item: TItem): boolean;

    /**
     * Checks isSelected || isCurrent.
     */
    isActive(item: TItem): boolean;

    commit(): void;

    cancel(): void;

    clear(): void;
}
