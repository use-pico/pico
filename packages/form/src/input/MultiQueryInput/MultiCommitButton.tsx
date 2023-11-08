import {IconClick}                 from "@tabler/icons-react";
import {tx}                        from "@use-pico/i18n";
import {
    type PicoSchema,
    type WithIdentitySchema
}                                  from "@use-pico/schema";
import {type IMultiSelectionStore} from "@use-pico/selection";
import {useStore}                  from "@use-pico/store";
import {
    Button,
    ModalStore
}                                  from "@use-pico/ui";
import {useController}             from "react-hook-form";
import {type ValuesSchema}         from "../../schema/ValuesSchema";
import {Form}                      from "../../ui/Form";

export namespace MultiCommitButton {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TResponseSchema extends WithIdentitySchema,
    > extends Pick<Form.Input.PropsEx<TValuesSchema, Button.Props>, "withControl"> {
        MultiSelectionStore: IMultiSelectionStore<PicoSchema.Output<TResponseSchema>>;
        onCommit?: (props: IMultiCommitButtonProps.OnCommitProps<TResponseSchema>) => void;
    }

    export namespace IMultiCommitButtonProps {
        export interface OnCommitProps<
            TResponseSchema extends WithIdentitySchema,
        > {
            items?: PicoSchema.Output<TResponseSchema>[];
        }
    }
}

export const MultiCommitButton = <
    TValuesSchema extends ValuesSchema,
    TResponseSchema extends WithIdentitySchema,
>(
    {
        withControl,
        MultiSelectionStore,
        onCommit,
        ...props
    }: MultiCommitButton.Props<TValuesSchema, TResponseSchema>
) => {
    const {
        field: {
                   onChange,
               },
    } = useController(withControl);
    const {close} = useStore(ModalStore, ({close}) => ({close}));
    const {
        selection,
        commit
    } = useStore(MultiSelectionStore, (
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
            onChange([...selection.values()].map(item => item.id));
            commit();
            onCommit?.({items: [...selection.values()]});
            close("query-input");
        }}
        {...props}
    >
        {tx()`Confirm selection`}
    </Button>;
};
