"use client";

import {
    Group,
    Menu
}                        from "@mantine/core";
import {isLink}          from "@use-pico/navigation";
import {type FC}         from "react";
import {type IMenuGroup} from "../api/IMenuGroup";
import {WithIcon}        from "../ui/WithIcon";
import {isMenuLabel}     from "./isMenuLabel";
import {MenuLabel}       from "./MenuLabel";
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
            {items.map((item, index) => {
                if (isLink(item)) {
                    return <MenuLink
                        key={`menu-group-item-${index}`}
                        className={className}
                        {...item}
                    />;
                } else if (isMenuLabel(item)) {
                    return <MenuLabel
                        key={`menu-group-item-${index}`}
                        {...item}
                    />;
                }
                return null;
            })}
        </Menu.Dropdown>
    </Menu>;
};
