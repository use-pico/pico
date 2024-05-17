"use client";

import {
    cn,
    type ILink,
    isHrefProps
}                    from "@use-pico2/common";
import {usePathname} from "next/navigation";
import {
    type FC,
    type ReactNode
}                    from "react";
import {isMenuGroup} from "./isMenuGroup";
import {isMenuLabel} from "./isMenuLabel";
import {MenuGroup}   from "./MenuGroup";
import {MenuLabel}   from "./MenuLabel";
import {MenuLink}    from "./MenuLink";

export namespace Menu {
    export interface Label {
        type: "label";
        label: ReactNode;
        icon?: string;
    }

    export interface Link extends ILink {
        type: "link",
        label?: ReactNode;
        icon?: string;
        catch?: string[];
    }

    export interface Group {
        type: "group";
        label?: ReactNode;
        icon?: string;
        items: (Label | Link)[];
        catch?: string[];
    }

    export type Items = (Link | Group | Label | undefined | null | false)[];

    export interface Props extends cn.WithClass {
        items: Items;
        active?: string[];
    }

    export type PropsEx = Omit<Props, "items">;
}

export const Menu: FC<Menu.Props> = (
    {
        items,
        active,
        cx = [],
    }
) => {
    const pathname = usePathname();

    return <div
        className={cn(
            "flex flex-row",
            cx,
        )}
    >
        {items.filter(Boolean).map((item, index) => {
            if (isHrefProps(item)) {
                return <MenuLink
                    key={`menu-${index}-${item.href}`}
                    active={active?.includes(item.href) || item.catch?.some(catchHref => pathname?.includes(catchHref))}
                    {...item}
                />;
            } else if (isMenuGroup(item)) {
                return <MenuGroup
                    key={`menu-group-${index}`}
                    active={item.catch?.some(catchHref => pathname?.includes(catchHref))}
                    {...item}
                />;
            } else if (isMenuLabel(item)) {
                return <MenuLabel
                    key={`menu-label-${index}`}
                    {...item}
                />;
            }
            return null;
        })}
    </div>;
};
