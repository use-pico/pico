import { cssOf } from "@use-pico/common";
import { type FC } from "react";
import { Icon } from "../ui/Icon";
import { type Menu } from "./Menu";

export namespace MenuClick {
	export interface Props extends Omit<Menu.Click, "type"> {
	}
}

export const MenuClick: FC<MenuClick.Props> = (
	{
		label,
		icon,
		onClick,
		css,
	}
) => {
	return <div
		className={cssOf(
			"flex flex-row items-center gap-2",
			"cursor-pointer",
			"font-bold",
			"py-1 px-1",
			"text-sm",
			"text-slate-500",
			"border-b-2 border-slate-200",
			css,
		)}
		onClick={() => onClick()}
	>
		{icon ? <Icon
			icon={icon}
		/> : null}
		{label}
	</div>;
};
