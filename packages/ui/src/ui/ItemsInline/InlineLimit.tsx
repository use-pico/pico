import {t}                       from "@use-pico/i18n";
import {type WithIdentitySchema} from "@use-pico/schema";
import {useStore}                from "@use-pico/store";
import {ReactNode}               from "react";
import {MoreIcon}                from "../../icon/MoreIcon";
import {ModalStore}              from "../../modal/ModalStore";
import {ActionIcon}              from "../ActionIcon";
import {type ItemsInline}        from "../ItemsInline";
import {NativeBreadcrumbs}       from "../NativeBreadcrumbs";
import {Text}                    from "../Text";
import {Tooltip}                 from "../Tooltip";

export namespace InlineLimit {
    export interface Props<
        TItem extends WithIdentitySchema.Type,
    > {
        label?: {
            empty: ReactNode;
        };
        items: TItem[];
        Item: ItemsInline.Item<TItem>;
        limit?: number;
        count: number;
    }
}

export const InlineLimit = <
    TItem extends WithIdentitySchema.Type,
>(
    {
        label,
        items,
        Item,
        limit,
        count,
    }: InlineLimit.Props<TItem>
) => {
    const modalStore = useStore(ModalStore, ({open}) => ({open}));
    return <NativeBreadcrumbs>
        {items.map(item => <Item key={item.id} entity={item}/>)}
        {!items.length && <Text c={"dimmed"}>
            {label?.empty}
        </Text>}
        {(limit && count > limit) && <>
            <Tooltip label={t()`Show more items`}>
                <ActionIcon
                    variant={"subtle"}
                    onClick={e => {
                        e.stopPropagation();
                        modalStore.open("detail");
                    }}
                >
                    <MoreIcon/>
                </ActionIcon>
            </Tooltip>
        </>}
    </NativeBreadcrumbs>;
};
