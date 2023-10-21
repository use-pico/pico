"use client";

import {
    parse$,
    type PicoSchema
}                             from "@use-pico/schema";
import {createStore}          from "@use-pico/store";
import {generateId}           from "@use-pico/utils";
import {type IListStoreProps} from "../api/IListStoreProps";
import {withItems}            from "../utils/withItems";

export interface ICreateListStoreProps<TSchema extends PicoSchema> {
    name: string;
    schema: TSchema;
}

/**
 * Creates a simple dynamic list source; this is useful when a user needs to dynamically manage
 * rows in the UI.
 */
export const createListStore = <TSchema extends PicoSchema>(
    {
        name,
        schema,
    }: ICreateListStoreProps<TSchema>
) => createStore<IListStoreProps<TSchema>>({
    name,
    state: () => (set, get) => ({
        schema,
        items:  new Map(),
        map:    callback => {
            return [...get().items.values()]
                .map(({
                          id,
                          item
                      }) => [id, parse$(schema, item)])
                /**
                 * Filter out invalid items
                 */
                .filter((item): item is [string, parse$.ResultSuccess<TSchema>] => parse$(schema, item[1]).success)
                /**
                 * Ensure an item satisfies the given schema
                 */
                .map(([id, item]) => ({
                    id,
                    item,
                }))
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
            if (!parse$(schema, item).success) {
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
            if (!parse$(schema, item).success) {
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
