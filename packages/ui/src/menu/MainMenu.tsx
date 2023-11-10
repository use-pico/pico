"use client";

import {Group}           from "@mantine/core";
import {isLink}          from "@use-pico/navigation";
import {cx}              from "@use-pico/utils";
import {usePathname}     from "next/navigation";
import {type FC}         from "react";
import {type IMenuItems} from "../api/IMenuItems";
import {isMenuGroup}     from "./isMenuGroup";
import classes           from "./MainMenu.module.css";
import {MenuGroup}       from "./MenuGroup";
import {MenuLink}        from "./MenuLink";

export namespace MainMenu {
    export interface Props {
        links: IMenuItems;
        active?: string[];
    }

    export type Classes = typeof classes;
}

export const MainMenu: FC<MainMenu.Props> = (
    {
        links,
        active,
    }) => {
    const pathname = usePathname();

    return <Group
        className={classes.MenuGroup}
        gap={0}
    >
        {links.map((item, index) => {
            if (isLink(item)) {
                return <MenuLink
                    key={`main-menu-${index}-${item.href}`}
                    className={cx(
                        classes.Link,
                        classes.LinkActive ? {
                            [classes.LinkActive]: pathname?.includes(item.href) || active?.includes(item.href),
                        } : undefined
                    )}
                    {...item}
                />;
            } else if (isMenuGroup(item)) {
                return <MenuGroup
                    key={`main-menu-group-${index}`}
                    className={classes.Link}
                    {...item}
                />;
            }
            return null;
        })}
    </Group>;
};
