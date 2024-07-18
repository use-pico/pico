import { cssOf } from "@use-pico/common";
import { type FC } from "react";
import { usePath } from "../router/usePath";
import { Icon } from "../ui/Icon";
import { type Menu } from "./Menu";
import { MenuLabel } from "./MenuLabel";
import { MenuLink } from "./MenuLink";

export namespace MenuGroup {
	export interface Props extends Omit<Menu.Group, "type" | "catch"> {
		active?: boolean;
	}
}

 
export const MenuGroup: FC<MenuGroup.Props> = ({
	label,
	items,
	icon,
	active = false,
}) => {
	const pathname = usePath();
	return (
		<div className={cssOf("group relative cursor-pointer")}>
			<div
				className={cssOf(
					"flex flex-row items-center gap-2",
					"opacity-80",
					"group",
					"hover:opacity-100",
					"border-b-2 border-transparent",
					"hover:border-sky-400",
					"py-1 px-2",
					active && "border-sky-400",
				)}
			>
				{icon ?
					<Icon
						icon={icon}
						css={["opacity-80", "group-hover:opacity-100"]}
					/>
				:	null}
				{label}
			</div>
			<div
				className={cssOf(
					"flex flex-col w-max gap-2",
					"invisible absolute",
					"group-hover:visible",
					"shadow-md",
					"z-20",
					"bg-white",
					"px-4",
					"py-2",
				)}
			>
				{/* eslint-disable-next-line array-callback-return */}
				{items.map((item, index) => {
					switch (item.type) {
						case "link":
							return (
								<MenuLink
									key={`menu-group-item-${index}`}
									active={
										pathname.includes(item.href) ||
										item.catch?.some((catchHref) =>
											pathname.includes(catchHref),
										)
									}
									{...item}
								/>
							);
						case "label":
							return (
								<MenuLabel
									key={`menu-group-item-${index}`}
									{...item}
								/>
							);
					}
				})}
			</div>
		</div>
	);
};
