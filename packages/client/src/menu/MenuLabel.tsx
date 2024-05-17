import {cn}        from "@use-pico2/common";
import {type FC}   from "react";
import {Icon}      from "../ui/Icon";
import {type Menu} from "./Menu";

export namespace MenuLabel {
    export interface Props extends Omit<Menu.Label, "type"> {
        iconSize?: Icon.Props["size"];
    }
}

export const MenuLabel: FC<MenuLabel.Props> = (
    {
        label,
        icon,
        iconSize = "2xl",
    }
) => {
    return <div
        className={cn(
            "flex flex-row items-center gap-2",
            "cursor-default",
            "font-bold",
            "py-1 px-1",
            "text-sm",
            "text-slate-500",
            "border-b-2 border-slate-200",
        )}
    >
        {icon ? <Icon
            icon={icon}
            cx={[]}
            size={iconSize}
        /> : null}
        {label}
    </div>;
};
