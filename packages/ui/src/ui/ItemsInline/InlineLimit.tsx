import {Translation}             from "@pico/i18n";
import {type WithIdentitySchema} from "@pico/query";
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
        label?: string;
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
    const modalStore = ModalStore.use(({open}) => ({open}));
    return <NativeBreadcrumbs>
        {items.map(item => <Item key={item.id} entity={item}/>)}
        {!items.length && <Text c={"dimmed"}>
            <Translation label={label} withLabel={"empty"}/>
        </Text>}
        {(limit && count > limit) && <>
            <Tooltip label={<Translation namespace={"common.inline"} withLabel={"more.label"}/>}>
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
