import {
    type PicoSchema,
    type WithIdentitySchema
}                             from "@use-pico/schema";
import {type ISelectionStore} from "@use-pico/selection";
import {
    Group,
    ModalStore
}                             from "@use-pico/ui";
import {type FC}              from "react";
import type {ValuesSchema}    from "../../schema/ValuesSchema";
import {InputEx}              from "../InputEx";

export namespace WithItem {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
    > extends InputEx.Props<TValuesSchema> {
        Item: Item<TResponseSchema>;
        SelectionStore: ISelectionStore<PicoSchema.Output<TResponseSchema>>;
    }

    export type Item<TResponseSchema extends WithIdentitySchema> = FC<ItemProps<TResponseSchema>>;

    export interface ItemProps<TResponseSchema extends WithIdentitySchema> {
        entity: PicoSchema.Output<TResponseSchema>;
    }
}

export const WithItem = <
    TValuesSchema extends ValuesSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        disabled,
        Item,
        SelectionStore,
        ...props
    }: WithItem.Props<TValuesSchema, TResponseSchema>
) => {
    const {open} = ModalStore.use(({open}) => ({open}));
    const {
        clear,
        item
    } = SelectionStore.use((
        {
            clear,
            item
        }) => ({
        clear,
        item
    }));
    return <InputEx
        disabled={disabled}
        onClick={disabled ? undefined : () => open("query-input")}
        onClear={disabled ? undefined : clear}
        {...props}
    >
        {item ? <Group
            gap={4}
            align={"center"}
        >
            <Item entity={item}/>
        </Group> : null}
    </InputEx>;
};
