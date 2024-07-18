import { Css, cssOf } from "@use-pico/common";
import { type FC } from "react";
import { LocaleLink } from "../i18n/LocaleLink";
import { Icon } from "../ui/Icon";
import { Menu } from "./Menu";

export namespace MenuLink {
	export interface Props extends Omit<Menu.Link, "type" | "catch">, Css.Style {
		active?: boolean;
	}
}

export const MenuLink: FC<MenuLink.Props> = ({
	href,
	query,
	icon,
	label,
	active = false,
	css,
}) => {
	return (
		<LocaleLink
			className={cssOf(
				"flex flex-row items-center gap-2",
				"opacity-80",
				"group",
				"hover:opacity-100",
				"border-b-2 border-transparent",
				"hover:border-sky-400",
				"py-1 px-2",
				active && "border-sky-400",
				css,
			)}
			href={{
				href,
				query,
			}}
		>
			{icon ?
				<Icon
					icon={icon}
					css={["opacity-80", "group-hover:opacity-100"]}
				/>
			:	null}
			{label}
		</LocaleLink>
	);
};
