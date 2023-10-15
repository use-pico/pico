import {Translation} from "@use-pico/i18n";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                    from "react";
import {Button}      from "../ui/Button";
import {Modal}       from "./Modal";
import {ModalStore}  from "./ModalStore";

export namespace ModalButton {
    export type Props = PropsWithChildren<{
        modalId: string;
        icon?: ReactNode;
        title: string;
        label: string;
        modalProps?: Modal.Props["modalProps"];
        buttonProps?: Button.Props;
    }>
}

export const ModalButton: FC<ModalButton.Props> = (
    {
        modalId,
        icon,
        title,
        label,
        modalProps,
        children,
        buttonProps: {
                         onClick,
                         ...buttonProps
                     } = {}
    }
) => {
    const modalStore = ModalStore.use(({open}) => ({open}));
    return <>
        <Modal
            title={title}
            icon={icon}
            modalId={modalId}
            modalProps={modalProps}
        >
            {children}
        </Modal>
        <Button
            onClick={e => {
                modalStore.open(modalId);
                onClick?.(e);
            }}
            leftSection={icon}
            {...buttonProps}
        >
            <Translation withLabel={label}/>
        </Button>
    </>;
};
