"use client";

import {Table}                   from "@mantine/core";
import {Translation}             from "@pico/i18n";
import {type WithIdentitySchema} from "@pico/query";
import {IconFileDots}            from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC
}                                from "react";
import {Modal}                   from "../modal/Modal";
import {ModalStoreProvider}      from "../modal/ModalStoreProvider";
import {Group}                   from "./Group";
import {InlineLimit}             from "./ItemsInline/InlineLimit";

export namespace ItemsInline {
    export interface Props<
        TItem extends WithIdentitySchema.Type,
    > extends ComponentProps<typeof Group> {
        label?: string;
        items: TItem[];
        Item: Item<TItem>;
        limit?: number;
    }

    export type Item<TItem extends WithIdentitySchema.Type> = FC<ItemProps<TItem>>;

    export interface ItemProps<TItem extends WithIdentitySchema.Type> {
        entity: TItem;
    }
}

export const ItemsInline = <
    TItem extends WithIdentitySchema.Type,
>(
    {
        label,
        Item,
        items,
        limit,
    }: ItemsInline.Props<TItem>
) => {
    return <ModalStoreProvider>
        <Modal
            onClick={e => e.stopPropagation()}
            icon={<IconFileDots/>}
            title={<Translation namespace={"common.inline"} withLabel={"more.title"}/>}
            modalId={"detail"}
        >
            <Table
                withTableBorder
                withRowBorders
                withColumnBorders
                highlightOnHover
                striped
            >
                <Table.Tbody>
                    {items.map(item => <Table.Tr
                        key={item.id}
                    >
                        <Table.Td>
                            <Item entity={item}/>
                        </Table.Td>
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </Modal>
        <InlineLimit
            label={label}
            limit={limit}
            items={limit ? items.slice(0, limit) : items}
            Item={Item}
            count={items.length}
        />
    </ModalStoreProvider>;
};
