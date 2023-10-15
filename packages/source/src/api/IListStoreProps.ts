import {type IStoreProps} from "@use-pico/store";
import {type z}           from "@use-pico/utils";
import {type IListItem}   from "./IListItem";

export type IListStoreProps<TSchema extends z.ZodSchema> = IStoreProps<{
    /**
     * Schema a list is operating on.
     */
    schema: TSchema;
    /**
     * Items in a list; record, because ID of an item is provided.
     */
    items: Map<string, IListItem.WithIdentity<TSchema>>;
    /**
     * Map over items with the given callback; shorthand for 'items' access
     */
    map<T>(callback: (item: IListItem.WithIdentity<TSchema>) => T): T[];
    /**
     * Set items; they're remapped to Map with generated (or provided) IDs.
     */
    set(items: IListItem.WithIdentity<TSchema>[]): void;
    /**
     * Push new items (replacing current ones) and generate IDs.
     */
    push(items: IListItem.Item<TSchema>[]): void;
    /**
     * Add an item on the end of the map.
     */
    add(item: IListItem.WithIdentity<TSchema>): void;
    /**
     * Just add an item, ID is generated.
     */
    put(item: IListItem.Item<TSchema>): void;
    /**
     * Remove item by an (internally generated) ID.
     */
    remove(id: string): void;
}>;
