import {TableActionMenu} from "@use-pico/table";
import {
    CreateIcon,
    Modal,
    ModalMenuItem
}                        from "@use-pico/ui";
import {
    type ReactNode,
    useMemo
}                        from "react";

export namespace TableAction {
    export interface Props {
        text: {
            create: {
                title: ReactNode;
                label: ReactNode;
            };
        };
        name: string;
        icon: ReactNode;
        upsertForm: UpsertFormFactory;
    }

    export type UpsertFormFactory = (props: UpsertFormFactory.Props) => ReactNode;
    export namespace UpsertFormFactory {
        export interface Props {
            modalId: string;
        }
    }
}

export const TableAction = (
    {
        text,
        name,
        icon,
        upsertForm,
    }: TableAction.Props
) => {
    const createId = `${name}.create`;

    return <>
        <Modal
            icon={<CreateIcon/>}
            modalId={createId}
            title={text.create.title}
            modalProps={{
                closeOnClickOutside: false,
            }}
        >
            {useMemo(() => upsertForm({
                modalId: createId,
            }), [name])}
        </Modal>

        <TableActionMenu>
            <ModalMenuItem
                modalId={createId}
                withLabel={text.create.label}
                leftSection={icon}
            />
        </TableActionMenu>
    </>;
};
