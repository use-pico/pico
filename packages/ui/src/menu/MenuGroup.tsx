"use client";

import {
    Group,
    Menu
}                        from "@mantine/core";
import {type FC}         from "react";
import {type IMenuGroup} from "../api/IMenuGroup";
import {WithIcon}        from "../ui/WithIcon";
import {MenuLink}        from "./MenuLink";

export namespace MenuGroup {
    export interface Props extends IMenuGroup {
        className?: string;
    }
}

export const MenuGroup: FC<MenuGroup.Props> = (
    {
        className,
        label,
        icon,
        items,
    }
) => {
    return <Menu
        trigger={"hover"}
        transitionProps={{exitDuration: 0}}
        withinPortal
    >
        <Menu.Target>
            <a
                className={className}
                onClick={event => event.preventDefault()}
            >
                <Group
                    justify={"apart"}
                    gap={"xs"}
                >
                    <WithIcon
                        icon={icon}
                    />
                    {label}
                </Group>
            </a>
        </Menu.Target>
        <Menu.Dropdown>
            {Object.entries(items).map(([id, item]) => <MenuLink
                key={id}
                className={className}
                {...item}
            />)}
        </Menu.Dropdown>
    </Menu>;
};
