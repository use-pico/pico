"use client";

import {tx}                  from "@use-pico/i18n";
import {
    type FilterSchema,
    type IQueryStore,
    type IWithMutation,
    type QuerySchema,
    useMutation
}                            from "@use-pico/query";
import {type MutationSchema} from "@use-pico/source";
import {useStore}            from "@use-pico/store";
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

export namespace DeleteByModal {
    export interface Props<
        TFilterSchema extends FilterSchema,
    > extends Omit<Modal.Props, "title"> {
        text: {
            title: ReactNode;
            content: ReactNode;
            confirm?: ReactNode;
            success: {
                title: ReactNode;
                message: ReactNode;
            };
        };
        withMutation: IWithMutation<
            MutationSchema<any, QuerySchema<TFilterSchema, any>>,
            any
        >;
        withQueryStore: IQueryStore.Store<QuerySchema<TFilterSchema, any>>;
    }
}

export const DeleteByModal = <
    TFilterSchema extends FilterSchema,
>(
    {
        text,
        withMutation,
        withQueryStore,
        ...props
    }: DeleteByModal.Props<TFilterSchema>
) => {
    const {close} = useStore(ModalStore, ({close}) => ({close}));
    const successNotification = useSuccessNotification();
    const {
        where,
        filter,
    } = useStore(withQueryStore, (
        {
            where,
            filter
        }) => ({
        where,
        filter
    }));
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
                disabled={deleteMutation.isPending}
                onClick={() => close(props.modalId)}
            >
                {tx()`Cancel`}
            </Button>
            <Button
                size={"lg"}
                color={"red"}
                leftSection={<TrashIcon/>}
                loading={deleteMutation.isPending}
                onClick={() => {
                    deleteMutation.mutate({
                        delete: {
                            filter,
                            where,
                        },
                    }, {
                        onSuccess: () => {
                            successNotification({
                                ...text.success
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
