"use client";

import {useSuccessNotification} from "@pico/hook";
import {Translation}            from "@pico/i18n";
import {
    type FilterSchema,
    type QuerySchema
}                               from "@pico/query";
import {
    type WithMutation,
    type WithSourceQuery
}                               from "@pico/rpc";
import {
    Button,
    CloseIcon,
    Divider,
    Flex,
    Modal,
    ModalStore,
    TrashIcon
}                               from "@pico/ui";

export namespace DeleteByModal {
    export interface Props<
        TFilterSchema extends FilterSchema,
    > extends Modal.Props {
        withMutation: WithMutation<QuerySchema<TFilterSchema, any>, any>;
        withSourceQuery: WithSourceQuery<any, TFilterSchema, any>;
    }
}

export const DeleteByModal = <
    TFilterSchema extends FilterSchema,
>(
    {
        withMutation,
        withSourceQuery,
        ...props
    }: DeleteByModal.Props<TFilterSchema>
) => {
    const {close} = ModalStore.use(({close}) => ({close}));
    const successNotification = useSuccessNotification();
    const {
        where,
        filter
    } = withSourceQuery.query.use((
        {
            where,
            filter
        }) => ({
        where,
        filter
    }));
    const deleteMutation = withMutation.useMutation();

    return <Modal
        modalProps={{
            closeOnClickOutside: !deleteMutation.isPending,
        }}
        title={"delete-by.title"}
        {...props}
    >
        <Translation withLabel={"delete-by.content"}/>
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
                <Translation namespace={"common"} withLabel={"cancel.button"}/>
            </Button>
            <Button
                size={"lg"}
                color={"red"}
                leftSection={<TrashIcon/>}
                loading={deleteMutation.isPending}
                onClick={() => {
                    deleteMutation.mutate({
                        where,
                        filter,
                    } as QuerySchema.Type<TFilterSchema, any>, {
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
                <Translation withLabel={"delete-by.confirm.button"}/>
            </Button>
        </Flex>
    </Modal>;
};
