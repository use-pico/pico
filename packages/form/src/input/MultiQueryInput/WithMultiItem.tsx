import {type WithIdentitySchema}   from "@pico/query";
import {type IMultiSelectionStore} from "@pico/selection";
import {
    Group,
    ModalStore
}                                  from "@pico/ui";
import {type z}                    from "@pico/utils";
import {type FC}                   from "react";
import type {ValuesSchema}         from "../../schema/ValuesSchema";
import {InputEx}                   from "../InputEx";

export namespace WithMultiItem {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
    > extends InputEx.Props<TValuesSchema> {
        Items: Items<TResponseSchema>;
        MultiSelectionStore: IMultiSelectionStore<z.infer<TResponseSchema>>;
        limit: number;
    }

    export type Items<TResponseSchema extends WithIdentitySchema> = FC<ItemProps<TResponseSchema>>;

    export interface ItemProps<TResponseSchema extends WithIdentitySchema> {
        items: z.infer<TResponseSchema>[];
        limit?: number;
    }
}

export const WithMultiItem = <
    TValuesSchema extends ValuesSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        Items,
        MultiSelectionStore,
        limit,
        ...props
    }: WithMultiItem.Props<TValuesSchema, TResponseSchema>
) => {
    const {open} = ModalStore.use(({open}) => ({open}));
    const selection = MultiSelectionStore.use((
        {
            clear,
            items
        }) => ({
        clear,
        items
    }));
    return <InputEx
        onClick={() => open("query-input")}
        onClear={() => {
            selection.clear();
            return [];
        }}
        {...props}
    >
        {selection.items.size > 0 ? <Group
            gap={4}
            align={"center"}
        >
            <Items
                items={[...selection.items.values()]}
                limit={limit}
            />
        </Group> : null}
    </InputEx>;
};
