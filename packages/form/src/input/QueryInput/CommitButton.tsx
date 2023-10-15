import {Translation}             from "@pico/i18n";
import {type WithIdentitySchema} from "@pico/schema";
import {type ISelectionStore}    from "@pico/selection";
import {
    Button,
    ModalStore
}                                from "@pico/ui";
import {type z}                  from "@pico/utils";
import {IconClick}               from "@tabler/icons-react";
import {useController}           from "react-hook-form";
import type {ValuesSchema}       from "../../schema/ValuesSchema";
import {Form}                    from "../../ui/Form";

export namespace CommitButton {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
    > extends Pick<Form.Input.PropsEx<TValuesSchema, Button.Props>, "withControl"> {
        SelectionStore: ISelectionStore<z.infer<TResponseSchema>>;

        onCommit?(props: OnCommitProps<TResponseSchema>): void;
    }

    export interface OnCommitProps<
        TResponseSchema extends WithIdentitySchema,
    > {
        item?: z.infer<TResponseSchema>;
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
    const modalStore = ModalStore.use(({close}) => ({close}));
    const selectionStore = SelectionStore.use((
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
        <Translation namespace={"common"} label={"selection"} withLabel={"submit.button"}/>
    </Button>;
};
