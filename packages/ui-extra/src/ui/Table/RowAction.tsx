import {type IWithMutation} from "@use-pico/query";
import {
    type PicoSchema,
    type WithIdentitySchema
}                           from "@use-pico/schema";
import {DeleteModal}        from "@use-pico/source-ui";
import {TableRowActionMenu} from "@use-pico/table";
import {type WithItem}      from "@use-pico/types";
import {
    EditIcon,
    Modal,
    ModalMenuItem,
    TrashIcon
}                           from "@use-pico/ui";
import {type ReactNode}     from "react";

export namespace RowAction {
    export interface Props<
        TItemSchema extends WithIdentitySchema,
    > extends WithItem.Schema<TItemSchema> {
        text: {
            delete: {
                label?: ReactNode;
                modal: DeleteModal.Props<any, any>["text"];
            };
            update: {
                title: ReactNode;
                label: ReactNode;
            };
        };
        name: string;
        icon: ReactNode;
        withMutation: IWithMutation<any, any>;
        upsertForm?: UpsertFormFactory<TItemSchema>;
    }

    export type UpsertFormFactory<
        TItemSchema extends WithIdentitySchema,
    > = (props: UpsertFormFactory.Props<TItemSchema>) => ReactNode;

    export namespace UpsertFormFactory {
        export interface Props<
            TItemSchema extends WithIdentitySchema,
        > {
            item: PicoSchema.Output<TItemSchema>;
            modalId: string;
        }
    }
}

export const RowAction = <
    TItemSchema extends WithIdentitySchema,
>(
    {
        text,
        name,
        icon,
        withMutation,
        upsertForm,
        item,
    }: RowAction.Props<TItemSchema>
) => {
    const deleteModalId = `${name}.delete.${item.id}`;
    const updateModalId = `${name}.update.${item.id}`;

    return <>
        <DeleteModal
            text={text.delete.modal}
            modalId={deleteModalId}
            entity={item}
            icon={icon}
            withMutation={withMutation}
        />
        {upsertForm && <Modal
            modalId={updateModalId}
            icon={icon}
            title={text.update.title}
            modalProps={{
                closeOnClickOutside: false,
            }}
        >
            {upsertForm({
                item,
                modalId: updateModalId,
            })}
        </Modal>}
        <TableRowActionMenu>
            {upsertForm && <ModalMenuItem
                leftSection={<EditIcon/>}
                modalId={updateModalId}
                label={text.update.label}
            />}
            <ModalMenuItem
                leftSection={<TrashIcon/>}
                modalId={deleteModalId}
                label={text.delete.label}
                color={"red.5"}
            />
        </TableRowActionMenu>
    </>;
};
