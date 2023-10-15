"use client";

import {
    Group,
    Modal as CoolModal
}                      from "@mantine/core";
import {Translation}   from "@pico/i18n";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode
}                      from "react";
import {BlockProvider} from "../store/BlockProvider";
import {Text}          from "../ui/Text";
import {WithIcon}      from "../ui/WithIcon";
import {ModalStore}    from "./ModalStore";

export namespace Modal {
    export type Props = PropsWithChildren<{
        modalId: string;
        title?: ReactNode;
        icon?: ReactNode;
        modalProps?: Omit<ComponentProps<typeof CoolModal>, "opened" | "onClose">;
    }>
}

export const Modal: FC<Modal.Props> = (
    {
        modalId,
        icon,
        title,
        modalProps,
        children,
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
        {...modalProps}
    >
        <BlockProvider>
            {children}
        </BlockProvider>
    </CoolModal>;
};
