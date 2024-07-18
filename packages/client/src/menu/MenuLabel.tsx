import {cssOf}     from "@use-pico/common";
import {type FC}   from "react";
import {Icon}      from "../ui/Icon";
import {type Menu} from "./Menu";

export namespace MenuLabel {
	export interface Props extends Omit<Menu.Label, "type"> {
	}
}

export const MenuLabel: FC<MenuLabel.Props> = (
	{
		label,
		icon,
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
	>
		{icon ? <Icon
			icon={icon}
		/> : null}
		{label}
	</div>;
};
