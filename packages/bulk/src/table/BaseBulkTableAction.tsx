import {TableActionMenu} from "@pico/table";
import {
    CreateIcon,
    Modal,
    ModalMenuItem
}                        from "@pico/ui";
import {
    type FC,
    ReactNode
}                        from "react";

export namespace BaseBulkTableAction {
    export interface Props {
        form: ReactNode;
    }
}

export const BaseBulkTableAction: FC<BaseBulkTableAction.Props> = (
    {
        form,
    }) => {
    return <>
        <Modal
            modalId={"common.bulk.create"}
            closeOnClickOutside={false}
            icon={<CreateIcon/>}
            title={"create.modal.title"}
        >
            {form}
        </Modal>
        {/*<DeleteByModal*/}
        {/*    withMutation={withDeleteByMutation}*/}
        {/*    withSourceQuery={withSourceQuery}*/}
        {/*    modalId={"common.bulk.delete-by"}*/}
        {/*/>*/}
        <TableActionMenu>
            <ModalMenuItem
                leftSection={<CreateIcon/>}
                modalId={"common.bulk.create"}
                withLabel={"create.menu.item"}
            />
            {/*<ModalMenuItem*/}
            {/*    leftSection={<TrashIcon/>}*/}
            {/*    color={"red"}*/}
            {/*    modalId={"common.bulk.delete-by"}*/}
            {/*    withLabel={"delete-by.menu.item"}*/}
            {/*/>*/}
        </TableActionMenu>
    </>;
};
