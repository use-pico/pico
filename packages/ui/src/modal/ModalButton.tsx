import {Translation} from "@pico/i18n";
import {
    type FC,
    type ReactNode
}                    from "react";
import {Button}      from "../ui/Button";
import {
    type IModalProps,
    Modal
}                    from "./Modal";
import {ModalStore}  from "./ModalStore";

export namespace ModalButton {
    export interface Props extends Button.Props {
        modalId: string;
        icon?: ReactNode;
        title: string;
        label: string;
        modalProps?: Omit<Partial<IModalProps>, "modalId">;
    }
}

export const ModalButton: FC<ModalButton.Props> = (
    {
        modalId,
        icon,
        title,
        label,
        onClick,
        modalProps,
        children,
        ...props
    }
) => {
    const modalStore = ModalStore.use(({open}) => ({open}));
    return <>
        <Modal
            title={title}
            icon={icon}
            modalId={modalId}
            {...modalProps}
        >
            {children}
        </Modal>
        <Button
            onClick={e => {
                modalStore.open(modalId);
                onClick?.(e);
            }}
            leftSection={icon}
            {...props}
        >
            <Translation withLabel={label}/>
        </Button>
    </>;
};
