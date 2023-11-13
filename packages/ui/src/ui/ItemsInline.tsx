import {Table}                   from "@mantine/core";
import {IconFileDots}            from "@tabler/icons-react";
import {t}                       from "@use-pico/i18n";
import {type WithIdentitySchema} from "@use-pico/schema";
import {
    type FC,
    ReactNode
}                                from "react";
import {Modal}                   from "../modal/Modal";
import {ModalStoreProvider}      from "../modal/ModalStoreProvider";
import {Group}                   from "./Group";
import {InlineLimit}             from "./ItemsInline/InlineLimit";

export namespace ItemsInline {
    export interface Props<
        TItem extends WithIdentitySchema.Type,
    > extends Group.Props {
        text?: {
            empty: ReactNode;
        };
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
        text,
        Item,
        items,
        limit,
    }: ItemsInline.Props<TItem>
) => {
    return <ModalStoreProvider>
        <Modal
            modalProps={{
                onClick: e => e.stopPropagation(),
            }}
            icon={<IconFileDots/>}
            title={t()`More`}
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
            label={text}
            limit={limit}
            items={limit ? items.slice(0, limit) : items}
            Item={Item}
            count={items.length}
        />
    </ModalStoreProvider>;
};
