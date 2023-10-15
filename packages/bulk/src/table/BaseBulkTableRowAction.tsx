import {TableRowActionMenu}      from "@pico/table";
import {WithEntity}              from "@pico/types";
import {
    DeleteModal,
    MenuLabel,
    ModalMenuItem,
    TrashIcon
}                                from "@pico/ui";
import {type FC}                 from "react";
import {type BulkMutationSchema} from "../schema/BulkMutationSchema";
import {type BulkSchema}         from "../schema/BulkSchema";

export namespace BaseBulkTableRowAction {
    export interface Props extends WithEntity.Schema<BulkSchema> {
        deleteModalProps: Omit<DeleteModal.Props<BulkMutationSchema, BulkSchema>, "modalId" | "entity">;
        // useCommitMutation: IUseMutation.Use<MutationSchema<any, any>, ResponseSchema>;
    }
}

export const BaseBulkTableRowAction: FC<BaseBulkTableRowAction.Props> = (
    {
        entity,
        deleteModalProps,
    }
) => {
    const modalId = `common.bulk.delete-${entity.id}`;
    // const commitMutation = useCommitMutation();

    return <>
        <DeleteModal<BulkMutationSchema, BulkSchema>
            entity={entity}
            modalId={modalId}
            {...deleteModalProps}
        />
        {/*<Modal*/}
        {/*    title={"commit.title"}*/}
        {/*    modalId={commitModalId}*/}
        {/*>*/}
        {/*    <Translation withLabel={"commit.content"}/>*/}
        {/*    <Divider mt={"sm"} mb={"sm"}/>*/}
        {/*    <Group justify={"apart"}>*/}
        {/*        <Button*/}
        {/*            size={"md"}*/}
        {/*            color={"blue"}*/}
        {/*            variant={"outline"}*/}
        {/*            disabled={commitMutation.isPending}*/}
        {/*            onClick={() => close(commitModalId)}*/}
        {/*        >*/}
        {/*            <Translation namespace={"common"} withLabel={"cancel.button"}/>*/}
        {/*        </Button>*/}
        {/*        <Button*/}
        {/*            size={"lg"}*/}
        {/*            color={"red"}*/}
        {/*            leftSection={<CheckIcon/>}*/}
        {/*            loading={commitMutation.isPending}*/}
        {/*            onClick={() => {*/}
        {/*                commitMutation.mutate({*/}
        {/*                    id: props.entity.id,*/}
        {/*                }, {*/}
        {/*                    onSuccess: () => {*/}
        {/*                        successNotification({*/}
        {/*                            withTranslation: {*/}
        {/*                                namespace: "common.bulk.commit",*/}
        {/*                            },*/}
        {/*                        });*/}
        {/*                    },*/}
        {/*                    onSettled: () => close(commitModalId),*/}
        {/*                });*/}
        {/*            }}*/}
        {/*        >*/}
        {/*            <Translation withLabel={"commit.confirm.button"}/>*/}
        {/*        </Button>*/}
        {/*    </Group>*/}
        {/*</Modal>*/}
        <TableRowActionMenu>
            {/*<MenuLabel*/}
            {/*    withLabel={"actions.menu.label"}*/}
            {/*/>*/}
            {/*{!props.entity.commit && <ModalMenuItem*/}
            {/*    disabled={commitMutation.isPending}*/}
            {/*    modalId={commitModalId}*/}
            {/*    leftSection={<IconCheck/>}*/}
            {/*    withLabel={"commit.menu.label"}*/}
            {/*/>}*/}
            <MenuLabel
                withLabel={"misc.menu.label"}
            />
            <ModalMenuItem
                modalId={modalId}
                withLabel={"delete.menu.item"}
                color={"red"}
                leftSection={<TrashIcon/>}
            />
        </TableRowActionMenu>
    </>;
};
