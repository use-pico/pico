import {TableRowActionMenu}      from "@use-pico/table";
import {WithEntity}              from "@use-pico/types";
import {
    MenuLabel,
    ModalMenuItem,
    TrashIcon
}                                from "@use-pico/ui";
import {DeleteModal}             from "@use-pico/ui-extra";
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

    return <>
        <DeleteModal<BulkMutationSchema, BulkSchema>
            entity={entity}
            modalId={modalId}
            {...deleteModalProps}
        />
        <TableRowActionMenu>
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
