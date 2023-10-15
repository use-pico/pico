"use client";

import {createStore}          from "@use-pico/store";
import {
    generateId,
    type z
}                             from "@use-pico/utils";
import {type IListStoreProps} from "../api/IListStoreProps";
import {withItems}            from "../utils/withItems";

export interface ICreateListStoreProps<TSchema extends z.ZodSchema> {
    name: string;
    schema: TSchema;
}

/**
 * Creates a simple dynamic list source; this is useful when a user needs to dynamically manage
 * rows in the UI.
 */
export const createListStore = <TSchema extends z.ZodSchema>(
    {
        name,
        schema,
    }: ICreateListStoreProps<TSchema>) => createStore<IListStoreProps<TSchema>>({
    name,
    state: () => (set, get) => ({
        schema,
        items:  new Map(),
        map:    callback => {
            return [...get().items.values()]
                /**
                 * Filter out invalid items
                 */
                .filter(({item}) => schema.safeParse(item).success)
                /**
                 * Ensure an item satisfies the given schema
                 */
                .map(({
                          id,
                          item
                      }) => {
                    return {
                        id,
                        item: schema.parse(item),
                    };
                })
                /**
                 * Run the user's callback with clear and expected data
                 */
                .map(callback);
        },
        set:    items => {
            set({
                items: new Map(items.map((
                    {
                        id,
                        item
                    }) => {
                    const $id = id || generateId();
                    return [$id, {
                        id: $id,
                        item,
                    }];
                }))
            });
        },
        push:   items => {
            set({
                items: withItems(items, schema),
            });
        },
        add:    ({
                     id,
                     item
                 }) => {
            if (!schema.safeParse(item).success) {
                return;
            }
            const items = get().items;
            const $id = id || generateId();
            set({
                items: items.set($id, {
                    id: $id,
                    item
                }),
            });
        },
        put:    item => {
            if (!schema.safeParse(item).success) {
                return;
            }
            const items = get().items;
            const $id = generateId();
            set({
                items: items.set($id, {
                    id: $id,
                    item
                }),
            });
        },
        remove: id => {
            get().items.delete(id);
        },
    }),
});
