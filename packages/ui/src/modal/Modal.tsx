"use client";

import {
    Group,
    Modal as CoolModal
}                      from "@mantine/core";
import {Translation}   from "@pico/i18n";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                      from "react";
import {BlockProvider} from "../store/BlockProvider";
import {Text}          from "../ui/Text";
import {WithIcon}      from "../ui/WithIcon";
import {ModalStore}    from "./ModalStore";

export interface IModalProps extends Omit<ComponentProps<typeof CoolModal>, "opened" | "onClose"> {
    modalId: string;
    icon?: ReactNode;
}

export const Modal: FC<IModalProps> = (
    {
        modalId,
        icon,
        title,
        children,
        ...props
    }) => {
    const {
        isOpen,
        close
    } = ModalStore.use((
        {
            isOpen,
            close
        }) => ({
        isOpen,
        close
    }));
    return <CoolModal
        opened={isOpen(modalId)}
        onClose={() => close(modalId)}
        title={title ? <Group gap={4}>
            <WithIcon icon={icon}/>
            <Text fw={600} size={"lg"}>
                <Translation withLabel={title}/>
            </Text>
        </Group> : undefined}
        size={"xl"}
        withinPortal
        {...props}
    >
        <BlockProvider>
            {children}
        </BlockProvider>
    </CoolModal>;
};
