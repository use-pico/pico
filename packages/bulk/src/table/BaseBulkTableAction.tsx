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
            modalProps={{
                closeOnClickOutside: false,
            }}
            modalId={"common.bulk.create"}
            icon={<CreateIcon/>}
            title={"create.modal.title"}
        >
            {form}
        </Modal>
        <TableActionMenu>
            <ModalMenuItem
                leftSection={<CreateIcon/>}
                modalId={"common.bulk.create"}
                withLabel={"create.menu.item"}
            />
        </TableActionMenu>
    </>;
};
