"use client";

import {tx}                  from "@use-pico/i18n";
import {
    type IWithMutation,
    useMutation
}                            from "@use-pico/query";
import {type ResponseSchema} from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {useStore}            from "@use-pico/store";
import {type WithEntity}     from "@use-pico/types";
import {
    Button,
    CloseIcon,
    Divider,
    Flex,
    Modal,
    ModalStore,
    TrashIcon,
    useSuccessNotification
}                            from "@use-pico/ui";
import {type ReactNode}      from "react";

export namespace DeleteModal {
    export interface Props<
        TMutationSchema extends MutationSchema<any, any>,
        TResponseSchema extends ResponseSchema,
    > extends Omit<Modal.Props, "title">, WithEntity.Schema<TResponseSchema> {
        text: {
            title?: ReactNode;
            content: ReactNode;
            success: {
                title: ReactNode;
                message: ReactNode;
            };
            confirm?: ReactNode;
        };
        withMutation: IWithMutation<
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
        text,
        withMutation,
        entity,
        ...props
    }: DeleteModal.Props<TMutationSchema, TResponseSchema>
) => {
    const {close} = useStore(ModalStore, ({close}) => ({close}));
    const successNotification = useSuccessNotification();
    const deleteMutation = useMutation({withMutation});

    return <Modal
        modalProps={{
            closeOnClickOutside: !deleteMutation.isPending,
        }}
        title={text.title}
        {...props}
    >
        {text.content}
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
                {tx()`Cancel`}
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
                        onSuccess: () => {
                            successNotification({
                                ...text.success,
                            });
                        },
                        onSettled: () => close(props.modalId),
                    });
                }}
            >
                {text.confirm ?? tx()`Delete`}
            </Button>
        </Flex>
    </Modal>;
};
