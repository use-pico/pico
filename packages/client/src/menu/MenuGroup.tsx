"use client";

import {
    cn,
    isLink
}                    from "@use-pico2/common";
import {usePathname} from "next/navigation";
import {type FC}     from "react";
import {Icon}        from "../ui/Icon";
import {isMenuLabel} from "./isMenuLabel";
import {type Menu}   from "./Menu";
import {MenuLabel}   from "./MenuLabel";
import {MenuLink}    from "./MenuLink";

export namespace MenuGroup {
    export interface Props extends Omit<Menu.Group, "type" | "catch"> {
        active?: boolean;
    }
}

export const MenuGroup: FC<MenuGroup.Props> = (
    {
        label,
        items,
        icon,
        active = false,
    }
) => {
    const pathname = usePathname();

    return <div
        className={cn(
            "group relative cursor-pointer",
        )}
    >
        <div
            className={cn(
                "flex flex-row items-center gap-2",
                "opacity-80",
                "group",
                "hover:opacity-100",
                "border-b-2 border-transparent",
                "hover:border-sky-400",
                "py-1 px-2",
                {"border-sky-400": active},
            )}
        >
            {icon ? <Icon
                icon={icon}
                cx={[
                    "opacity-80",
                    "group-hover:opacity-100",
                ]}
                size={"2xl"}
            /> : null}
            {label}
        </div>
        <div className={cn(
            "flex flex-col w-max gap-2",
            "invisible absolute",
            "group-hover:visible",
            "shadow-md",
            "z-20",
            "bg-white",
            "px-4",
            "py-2",
        )}>
            {items.map((item, index) => {
                if (isLink(item)) {
                    return <MenuLink
                        key={`menu-group-item-${index}`}
                        active={item.catch?.some(catchHref => pathname?.includes(catchHref))}
                        iconSize={"md"}
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
        </div>
    </div>;
};
