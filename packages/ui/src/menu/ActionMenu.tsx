"use client";

import {
    ActionIcon,
    Menu
}                       from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                       from "react";
import {ActionMenuIcon} from "../icon/ActionMenuIcon";

export namespace ActionMenu {
    export interface Props extends ComponentProps<typeof Menu> {
        icon?: ReactNode;
    }
}

export const ActionMenu: FC<ActionMenu.Props> = (
    {
        icon = <ActionMenuIcon/>,
        children,
        ...props
    }) => {
    return <Menu
        shadow={"md"}
        withinPortal
        position={"bottom-start"}
        {...props}
    >
        <Menu.Target>
            <ActionIcon variant={"subtle"}>
                {icon}
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            {children}
        </Menu.Dropdown>
    </Menu>;
};
