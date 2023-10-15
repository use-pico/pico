"use client";

import {Translation}            from "@pico/i18n";
import {type WithMutation}      from "@pico/query";
import {type MutationSchema}    from "@pico/source";
import {
    type ResponseSchema,
    type WithEntity
}                               from "@pico/types";
import {useSuccessNotification} from "../hook/useSuccessNotification";
import {CloseIcon}              from "../icon/CloseIcon";
import {TrashIcon}              from "../icon/TrashIcon";
import {Button}                 from "../ui/Button";
import {Divider}                from "../ui/Divider";
import {Flex}                   from "../ui/Flex";
import {
    type IModalProps,
    Modal
}                               from "./Modal";
import {ModalStore}             from "./ModalStore";

export namespace DeleteModal {
    export interface Props<
        TMutationSchema extends MutationSchema<any, any>,
        TResponseSchema extends ResponseSchema,
    > extends IModalProps, WithEntity.Schema<TResponseSchema> {
        withMutation: WithMutation<
            TMutationSchema,
            TResponseSchema
        >;
    }
}

export const DeleteModal = <
    TMutationSchema extends MutationSchema<any, any>,
    TResponseSchema extends ResponseSchema,
>(
    {
        withMutation,
        entity,
        ...props
    }: DeleteModal.Props<TMutationSchema, TResponseSchema>
) => {
    const {close} = ModalStore.use(({close}) => ({close}));
    const successNotification = useSuccessNotification();
    const deleteMutation = withMutation.useMutation();

    return <Modal
        closeOnClickOutside={!deleteMutation.isPending}
        title={"delete.title"}
        {...props}
    >
        <Translation withLabel={"delete.content"} values={entity}/>
        <Divider mt={"sm"} mb={"sm"}/>
        <Flex
            justify={"space-between"}
            align={"center"}
        >
            <Button
                leftSection={<CloseIcon/>}
                size={"md"}
                color={"blue"}
                variant={"subtle"}
                disabled={deleteMutation.isPending || deleteMutation.isSuccess}
                onClick={() => close(props.modalId)}
            >
                <Translation namespace={"common"} withLabel={"cancel.button"}/>
            </Button>
            <Button
                size={"lg"}
                color={"red"}
                leftSection={<TrashIcon/>}
                loading={deleteMutation.isPending || deleteMutation.isSuccess}
                onClick={() => {
                    deleteMutation.mutate({
                        delete: {
                            where: {
                                id: entity.id,
                            },
                        },
                    }, {
                        onSuccess: response => {
                            successNotification({
                                withTranslation: {
                                    label:  "delete",
                                    values: response,
                                },
                            });
                        },
                        onSettled: () => close(props.modalId),
                    });
                }}
            >
                <Translation withLabel={"delete.confirm.button"}/>
            </Button>
        </Flex>
    </Modal>;
};
