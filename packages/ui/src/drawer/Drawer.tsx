"use client";

import {
    Divider,
    Drawer as CoolDrawer,
    Group
}                      from "@mantine/core";
import {useStore}      from "@use-pico/store";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                      from "react";
import {BlockProvider} from "../store/BlockProvider";
import {Text}          from "../ui/Text";
import {WithIcon}      from "../ui/WithIcon";
import {DrawerStore}   from "./DrawerStore";

export namespace Drawer {
    export interface Props extends Omit<ComponentProps<typeof CoolDrawer>, "opened" | "onClose"> {
        drawerId: string;
        icon?: ReactNode;
    }
}

export const Drawer: FC<Drawer.Props> = (
    {
        drawerId,
        icon,
        title,
        children,
        ...props
    }) => {
    const {
        isOpen,
        close
    } = useStore(DrawerStore, (
        {
            isOpen,
            close
        }) => ({
        isOpen,
        close
    }));

    return <CoolDrawer
        opened={isOpen(drawerId)}
        onClose={() => close(drawerId)}
        position={"right"}
        title={title ? <Group gap={4}>
            <WithIcon icon={icon}/>
            <Text fw={600} size={"lg"}>
                {title}
            </Text>
        </Group> : undefined}
        size={"lg"}
        {...props}
    >
        <Divider mb={"sm"}/>
        <BlockProvider>
            {children}
        </BlockProvider>
    </CoolDrawer>;
};
