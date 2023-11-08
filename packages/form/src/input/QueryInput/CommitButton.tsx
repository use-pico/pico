"use client";

import {IconClick}            from "@tabler/icons-react";
import {tx}                   from "@use-pico/i18n";
import {
    type PicoSchema,
    type WithIdentitySchema
}                             from "@use-pico/schema";
import {type ISelectionStore} from "@use-pico/selection";
import {useStore}             from "@use-pico/store";
import {
    Button,
    ModalStore
}                             from "@use-pico/ui";
import {useController}        from "react-hook-form";
import type {ValuesSchema}    from "../../schema/ValuesSchema";
import {Form}                 from "../../ui/Form";

export namespace CommitButton {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
    > extends Pick<Form.Input.PropsEx<TValuesSchema, Button.Props>, "withControl"> {
        SelectionStore: ISelectionStore<PicoSchema.Output<TResponseSchema>>;

        onCommit?(props: OnCommitProps<TResponseSchema>): void;
    }

    export interface OnCommitProps<
        TResponseSchema extends WithIdentitySchema,
    > {
        item?: PicoSchema.Output<TResponseSchema>;
    }
}

export const CommitButton = <
    TValuesSchema extends ValuesSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withControl,
        SelectionStore,
        onCommit,
        ...props
    }: CommitButton.Props<TValuesSchema, TResponseSchema>
) => {
    const {
        field: {
                   onChange,
               },
    } = useController(withControl);
    const modalStore = useStore(ModalStore, ({close}) => ({close}));
    const selectionStore = useStore(SelectionStore, (
        {
            selection,
            commit
        }) => ({
        selection,
        commit
    }));

    return <Button
        leftSection={<IconClick/>}
        size={"lg"}
        onClick={() => {
            onChange?.(selectionStore.selection?.id);
            selectionStore.commit();
            onCommit?.({item: selectionStore.selection});
            modalStore.close("query-input");
        }}
        {...props}
    >
        {tx()`Submit selection`}
    </Button>;
};
