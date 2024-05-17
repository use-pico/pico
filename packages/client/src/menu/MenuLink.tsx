import {cn}         from "@use-pico2/common";
import {type FC}    from "react";
import {LocaleLink} from "../i18n/LocaleLink";
import {Icon}       from "../ui/Icon";
import {Menu}       from "./Menu";

export namespace MenuLink {
    export interface Props extends Omit<Menu.Link, "type" | "catch">, cn.WithClass {
        iconSize?: Icon.Props["size"];
        active?: boolean;
    }
}

export const MenuLink: FC<MenuLink.Props> = (
    {
        href,
        icon,
        label,
        iconSize = "2xl",
        active = false,
        cx,
    }
) => {
    return <LocaleLink
        className={cn(
            "flex flex-row items-center gap-2",
            "opacity-80",
            "group",
            "hover:opacity-100",
            "border-b-2 border-transparent",
            "hover:border-sky-400",
            "py-1 px-2",
            {"border-sky-400": active},
            cx,
        )}
        href={href}
    >
        {icon ? <Icon
            icon={icon}
            cx={[
                "opacity-80",
                "group-hover:opacity-100",
            ]}
            size={iconSize}
        /> : null}
        {label}
    </LocaleLink>;
};
